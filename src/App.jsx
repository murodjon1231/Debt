import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Layout from './components/Layout'
import Call from './pages/Call'
import Debit from './pages/Debit'
import Home from './pages/Home'
import Login from './pages/Login'
import Transactions from './pages/Transactions'
import axios from 'axios'
import NotFound from './pages/NotFound'

const API_URL = 'https://682d90894fae188947568d64.mockapi.io/debt'

const App = () => {
	const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin'))
	const [show, setShow] = useState(false)
	const [validated, setValidated] = useState(false)
	const [selected, setSelected] = useState(null)
	const [search, setSearch] = useState('')
	const [loading, setLoading] = useState(false)
	const [debt, setDebt] = useState({
		firstName: '',
		lastName: '',
		phone: '+998',
		date: '',
		debt: '',
		status: 'Borrowing',
	})
	const [debts, setDebts] = useState([])

	const fetchDebts = async () => {
		setLoading(true)
		try {
			const response = await axios.get(API_URL)
			setDebts(response.data)
		} catch (error) {
			toast.error('Failed to fetch debts')
			console.error('Error fetching debts:', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (isLogin) {
			fetchDebts()
		}
	}, [isLogin])

	const handleClose = () => {
		setValidated(false)
		setShow(false)
	}
	
	const handleShow = () => {
		setValidated(false)
		setShow(true)
	}

	const handleChange = e => {
		setDebt({ ...debt, [e.target.id]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (e.currentTarget.checkValidity()) {
			setLoading(true)
			try {
				if (selected === null) {
					// Create new debt
					const response = await axios.post(API_URL, debt)
					setDebts([...debts, response.data])
					toast.success('Added debt')
				} else {
					// Update existing debt
					const response = await axios.put(`${API_URL}/${selected}`, debt)
					setDebts(debts.map(item => (item.id === selected ? response.data : item)))
					toast.success('Updated debt')
				}
				handleClose()
				setDebt({
					firstName: '',
					lastName: '',
					phone: '+998',
					date: '',
					debt: '',
					status: 'Borrowing',
				})
				setValidated(false)
			} catch (error) {
				toast.error('Operation failed')
				console.error('Error:', error)
			} finally {
				setLoading(false)
			}
		} else {
			setValidated(true)
			toast.error('Please fill all required fields!')
		}
	}

	const deleteDebt = async (id) => {
		setLoading(true)
		try {
			await axios.delete(`${API_URL}/${id}`)
			setDebts(debts.filter(debt => debt.id !== id))
			toast.success('Debt deleted')
		} catch (error) {
			toast.error('Failed to delete debt')
			console.error('Error deleting debt:', error)
		} finally {
			setLoading(false)
		}
	}

	const editDebt = id => {
		setSelected(id)
		const editDebt = debts.find(item => item.id == id)
		setDebt(editDebt)
		handleShow()
	}

	const openModal = () => {
		handleShow()
		setSelected(null)
		setDebt({
			firstName: '',
			lastName: '',
			phone: '+998',
			date: '',
			debt: '',
			status: 'Borrowing',
		})
	}

	const DebtProps = {
		debts,
		show,
		validated,
		debt,
		selected,
		search,
		setSearch,
		handleSubmit,
		handleClose,
		handleShow,
		handleChange,
		deleteDebt,
		editDebt,
		openModal,
		setDebt,
		loading,
		fetchDebts
	}
	
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/login' element={<Login setIsLogin={setIsLogin} />} />
					<Route element={<Layout />}>
						<Route
							index
							element={
								isLogin ? <Home debts={debts} loading={loading} /> : <Navigate to={'/login'} />
							}
						/>
						<Route
							path='/debit'
							element={
								isLogin ? <Debit {...DebtProps} /> : <Navigate to={'/login'} />
							}
						/>
						<Route
							path='/transactions'
							element={isLogin ? <Transactions /> : <Navigate to={'/login'} />}
						/>
						<Route
							path='/call'
							element={isLogin ? <Call /> : <Navigate to={'/login'} />}
						/>
					</Route>
					<Route path='*' element={<NotFound/>} />
				</Routes>

				<ToastContainer />
			</BrowserRouter>
		</>
	)
}

export default App
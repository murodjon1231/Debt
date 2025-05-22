import React, { useEffect, useState, createContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Layout from './components/Layout'
import Call from './pages/Call'
import Debit from './pages/Debit'
import Home from './pages/Home'
import Login from './pages/Login'
import Transactions from './pages/Transactions'
import Calculator from './pages/Calculator'
import axios from 'axios'
import NotFound from './pages/NotFound'

// Language and Theme Context
export const AppContext = createContext()

// Translations
export const translations = {
	uz: {
		home: 'Bosh sahifa',
		debit: 'Qarzlar',
		transactions: 'Valyuta ayirboshlash',
		call: 'Bank aloqalari',
		calculator: 'Kalkulyator',
		logout: 'Chiqish',
		username: 'Foydalanuvchi nomi',
		password: 'Parol',
		signIn: 'Kirish',
		welcomeMessage: 'Qarz boshqaruv tizimiga xush kelibsiz',
		addDebt: 'Qarz qo\'shish',
		updateDebt: 'Qarzni tahrirlash',
		firstName: 'Ism',
		lastName: 'Familiya',
		phone: 'Telefon',
		productName: 'Mahsulot nomi',
		debtAmount: 'Qarz miqdori',
		currency: 'Valyuta',
		date: 'Sana',
		status: 'Holati',
		borrowing: 'Qarz olish',
		lending: 'Qarz berish',
		close: 'Yopish',
		update: 'Yangilash',
		edit: 'Tahrirlash',
		delete: 'O\'chirish',
		more: 'Batafsil',
		search: 'Qidirish...',
		fillAllFields: 'Barcha maydonlarni to\'ldiring!',
		debtAdded: 'Qarz muvaffaqiyatli qo\'shildi',
		debtUpdated: 'Qarz muvaffaqiyatli yangilandi',
		debtDeleted: 'Qarz o\'chirildi',
		noDebtsFound: 'Qarzlar topilmadi',
		basicCalculator: 'Oddiy kalkulyator',
		clear: 'Tozalash'
	},
	ru: {
		home: 'Главная',
		debit: 'Долги',
		transactions: 'Обмен валют',
		call: 'Банковские контакты',
		calculator: 'Калькулятор',
		logout: 'Выход',
		username: 'Имя пользователя',
		password: 'Пароль',
		signIn: 'Войти',
		welcomeMessage: 'Добро пожаловать в систему управления долгами',
		addDebt: 'Добавить долг',
		updateDebt: 'Редактировать долг',
		firstName: 'Имя',
		lastName: 'Фамилия',
		phone: 'Телефон',
		productName: 'Название продукта',
		debtAmount: 'Сумма долга',
		currency: 'Валюта',
		date: 'Дата',
		status: 'Статус',
		borrowing: 'Занимать',
		lending: 'Одалживать',
		close: 'Закрыть',
		update: 'Обновить',
		edit: 'Редактировать',
		delete: 'Удалить',
		more: 'Подробнее',
		search: 'Поиск...',
		fillAllFields: 'Заполните все поля!',
		debtAdded: 'Долг успешно добавлен',
		debtUpdated: 'Долг успешно обновлен',
		debtDeleted: 'Долг удален',
		noDebtsFound: 'Долги не найдены',
		basicCalculator: 'Простой калькулятор',
		clear: 'Очистить'
	},
	en: {
		home: 'Home',
		debit: 'Debts',
		transactions: 'Currency Exchange',
		call: 'Bank Contacts',
		calculator: 'Calculator',
		logout: 'Logout',
		username: 'Username',
		password: 'Password',
		signIn: 'Sign In',
		welcomeMessage: 'Welcome to Debt Management System',
		addDebt: 'Add Debt',
		updateDebt: 'Update Debt',
		firstName: 'First Name',
		lastName: 'Last Name',
		phone: 'Phone',
		productName: 'Product Name',
		debtAmount: 'Debt Amount',
		currency: 'Currency',
		date: 'Date',
		status: 'Status',
		borrowing: 'Borrowing',
		lending: 'Lending',
		close: 'Close',
		update: 'Update',
		edit: 'Edit',
		delete: 'Delete',
		more: 'More',
		search: 'Search...',
		fillAllFields: 'Please fill all fields!',
		debtAdded: 'Debt added successfully',
		debtUpdated: 'Debt updated successfully',
		debtDeleted: 'Debt deleted',
		noDebtsFound: 'No debts found',
		basicCalculator: 'Basic Calculator',
		clear: 'Clear'
	}
}

const API_URL = 'https://682d90894fae188947568d64.mockapi.io/debt'

const App = () => {
	const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin'))
	const [show, setShow] = useState(false)
	const [validated, setValidated] = useState(false)
	const [selected, setSelected] = useState(null)
	const [search, setSearch] = useState('')
	const [loading, setLoading] = useState(false)
	
	// New states for enhanced features
	const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
	const [language, setLanguage] = useState(localStorage.getItem('language') || 'en')
	const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser') || '{}'))
	
	const [debt, setDebt] = useState({
		firstName: '',
		lastName: '',
		phone: '+998',
		productName: '', // New field
		date: '',
		debt: '',
		currency: 'USD', // New field
		status: 'Borrowing',
	})
	const [debts, setDebts] = useState([])

	// Toggle theme
	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light'
		setTheme(newTheme)
		localStorage.setItem('theme', newTheme)
		document.body.className = newTheme
	}

	// Set language
	const setAppLanguage = (lang) => {
		setLanguage(lang)
		localStorage.setItem('language', lang)
	}

	// Get translation
	const t = translations[language] || translations.en

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
		// Set body class for theme
		document.body.className = theme
	}, [isLogin, theme])

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
					toast.success(t.debtAdded)
				} else {
					// Update existing debt
					const response = await axios.put(`${API_URL}/${selected}`, debt)
					setDebts(debts.map(item => (item.id === selected ? response.data : item)))
					toast.success(t.debtUpdated)
				}
				handleClose()
				setDebt({
					firstName: '',
					lastName: '',
					phone: '+998',
					productName: '',
					date: '',
					debt: '',
					currency: 'USD',
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
			toast.error(t.fillAllFields)
		}
	}

	const deleteDebt = async (id) => {
		setLoading(true)
		try {
			await axios.delete(`${API_URL}/${id}`)
			setDebts(debts.filter(debt => debt.id !== id))
			toast.success(t.debtDeleted)
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
			productName: '',
			date: '',
			debt: '',
			currency: 'USD',
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
		fetchDebts,
		theme,
		language,
		t
	}

	const contextValue = {
		theme,
		toggleTheme,
		language,
		setLanguage: setAppLanguage,
		t,
		currentUser,
		setCurrentUser
	}
	
	return (
		<AppContext.Provider value={contextValue}>
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
						<Route
							path='/calculator'
							element={isLogin ? <Calculator /> : <Navigate to={'/login'} />}
						/>
					</Route>
					<Route path='*' element={<NotFound/>} />
				</Routes>

				<ToastContainer theme={theme} />
			</BrowserRouter>
		</AppContext.Provider>
	)
}

export default App
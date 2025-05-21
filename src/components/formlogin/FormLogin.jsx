import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Form, Button, Card, Container, InputGroup } from 'react-bootstrap'
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa'
import USER from '../../utils/index'
import style from './FormLogin.module.css'

const FormLogin = ({ setIsLogin }) => {
	const [userName, setUserName] = useState('')
	const [password, setPassword] = useState('')
	const [validated, setValidated] = useState(false)
	const navigate = useNavigate()

	const submit = e => {
		e.preventDefault()
		setValidated(true)
		
		if (!userName || !password) {
			toast.error('Please enter both username and password')
			return
		}

		if (
			userName.toLowerCase() === USER.username &&
			password === USER.password
		) {
			toast.success('Welcome to Cartmon!')
			setIsLogin(1)
			navigate('/')
			localStorage.setItem('isLogin', 1)
		} else {
			toast.error('Username or password is incorrect, please try again!')
		}
	}

	return (
		<Container className={style['login-container']}>
			<Card className={style['login-card']}>
				<Card.Body>
					<div className={style['logo-container']}>
						<img src='/Recuva 1.svg' alt='Cartmon Logo' className={style['logo']} />
					</div>
					
					<h2 className="text-center mb-4">Debt Management System</h2>
					
					<Form noValidate validated={validated} onSubmit={submit}>
						<Form.Group className="mb-3">
							<Form.Label>Username</Form.Label>
							<InputGroup>
								<InputGroup.Text>
									<FaUser />
								</InputGroup.Text>
								<Form.Control
									required
									value={userName}
									onChange={e => setUserName(e.target.value)}
									placeholder='Enter your username'
									type='text'
								/>
								<Form.Control.Feedback type="invalid">
									Please enter a username
								</Form.Control.Feedback>
							</InputGroup>
						</Form.Group>
						
						<Form.Group className="mb-4">
							<Form.Label>Password</Form.Label>
							<InputGroup>
								<InputGroup.Text>
									<FaLock />
								</InputGroup.Text>
								<Form.Control
									required
									value={password}
									onChange={e => setPassword(e.target.value)}
									placeholder='Enter your password'
									type='password'
								/>
								<Form.Control.Feedback type="invalid">
									Please enter a password
								</Form.Control.Feedback>
							</InputGroup>
						</Form.Group>
						
						<Button 
							variant="primary" 
							type="submit" 
							className={style['login-btn']}
						>
							<FaSignInAlt className="me-2" /> Sign In
						</Button>
					</Form>
					
					<div className="text-center mt-4">
						<p className="text-muted">
							Demo credentials: <br />
							Username: admin, Password: admin
						</p>
					</div>
				</Card.Body>
			</Card>
		</Container>
	)
}

FormLogin.propTypes = {
	setIsLogin: PropTypes.func.isRequired,
}

export default FormLogin
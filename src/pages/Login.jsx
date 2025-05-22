import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Form, Button, Card, Container, InputGroup } from 'react-bootstrap'
import { FaUser, FaLock, FaSignInAlt, FaMoon, FaSun, FaGlobe } from 'react-icons/fa'
import USERS from '../utils/index'
import { AppContext } from '../App'
import style from './Login.module.css' // <<== MUHIM QISM

const Login = ({ setIsLogin }) => {
	const [userName, setUserName] = useState('')
	const [password, setPassword] = useState('')
	const [validated, setValidated] = useState(false)
	const navigate = useNavigate()
	const { theme, toggleTheme, language, setLanguage, t, setCurrentUser } = useContext(AppContext)

	const submit = e => {
		e.preventDefault()
		setValidated(true)

		if (!userName || !password) {
			toast.error(t.fillAllFields)
			return
		}

		const user = USERS.find(u => 
			u.username.toLowerCase() === userName.toLowerCase() && 
			u.password === password
		)

		if (user) {
			toast.success(`${t.welcomeMessage}, ${user.name}!`)
			setIsLogin('1')
			setCurrentUser(user)
			navigate('/')
			localStorage.setItem('isLogin', '1')
			localStorage.setItem('currentUser', JSON.stringify(user))
		} else {
			toast.error('Username or password is incorrect, please try again!')
		}
	}

	return (
		<Container className={`${style['login-container']} ${theme}`}>
			<Card className={`${style['login-card']} ${theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}`}>
				<Card.Body>
					<div className="d-flex justify-content-between align-items-center mb-3">
						<div className="d-flex align-items-center gap-2">
							<FaGlobe />
							<Form.Select 
								value={language} 
								onChange={(e) => setLanguage(e.target.value)}
								className={`${theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}`}
								style={{width: '120px', fontSize: '0.9rem'}}
							>
								<option value="uz">O'zbek</option>
								<option value="ru">Русский</option>
								<option value="en">English</option>
							</Form.Select>
						</div>
						<Button 
							variant="outline-secondary" 
							size="sm" 
							onClick={toggleTheme}
							className="d-flex align-items-center gap-1"
						>
							{theme === 'light' ? <FaMoon /> : <FaSun />}
							{theme === 'light' ? 'Dark' : 'Light'}
						</Button>
					</div>

					<div className={style['logo-container']}>
						<img src='/Recuva 1.svg' alt='Cartmon Logo' className={style['logo']} />
					</div>
					
					<h2 className="text-center mb-4">{t.welcomeMessage}</h2>
					
					<Form noValidate validated={validated} onSubmit={submit}>
						<Form.Group className="mb-3">
							<Form.Label>{t.username}</Form.Label>
							<InputGroup>
								<InputGroup.Text className={theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}>
									<FaUser />
								</InputGroup.Text>
								<Form.Control
									required
									value={userName}
									onChange={e => setUserName(e.target.value)}
									placeholder={t.username}
									type='text'
									className={theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}
								/>
								<Form.Control.Feedback type="invalid">
									Please enter a username
								</Form.Control.Feedback>
							</InputGroup>
						</Form.Group>
						
						<Form.Group className="mb-4">
							<Form.Label>{t.password}</Form.Label>
							<InputGroup>
								<InputGroup.Text className={theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}>
									<FaLock />
								</InputGroup.Text>
								<Form.Control
									required
									value={password}
									onChange={e => setPassword(e.target.value)}
									placeholder={t.password}
									type='password'
									className={theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}
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
							<FaSignInAlt className="me-2" /> {t.signIn}
						</Button>
					</Form>
					
					{/* <div className="text-center mt-4">
						<p className="text-muted mb-2">
							Demo credentials:
						</p>
						<div className="row">
							{USERS.map((user, index) => (
								<div key={index} className="col-md-6 mb-2">
									<small className={`${theme === 'dark' ? 'text-light' : 'text-muted'}`}>
										<strong>{user.name}:</strong><br />
										{user.username} / {user.password}
									</small>
								</div>
							))}
						</div>
					</div> */}
				</Card.Body>
			</Card>
		</Container>
	)
}

Login.propTypes = {
	setIsLogin: PropTypes.func.isRequired,
}

export default Login

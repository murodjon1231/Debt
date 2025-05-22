import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaMoon, FaSun, FaGlobe } from 'react-icons/fa'
import { AppContext } from '../../App'
import style from './Navbar.module.css'

const Navbar = () => {
	const navigate = useNavigate()
	const { theme, toggleTheme, language, setLanguage, t, currentUser } = useContext(AppContext)
	
	const handleLogout = () => {
		localStorage.removeItem('isLogin')
		localStorage.removeItem('currentUser')
		navigate('/login')
	}
	
	return (
		<div className={`${style["navbar-container"]} ${theme}`}>
			<div className={style["navbar"]}>
				<h4 className={style["brand"]}>
					Dashboard By <span className={style["brand-highlight"]}>{currentUser?.name || 'User'}</span>
				</h4>
				<div className={style["nav-controls"]}>
					{/* Language Selector */}
					<div className={style["language-control"]}>
						<FaGlobe className={style["control-icon"]} />
						<select 
							value={language} 
							onChange={(e) => setLanguage(e.target.value)}
							className={`${style["language-select"]} ${theme}`}
						>
							<option value="uz">O'zbek</option>
							<option value="ru">Русский</option>
							<option value="en">English</option>
						</select>
					</div>

					{/* Theme Toggle */}
					<button 
						onClick={toggleTheme} 
						className={`${style["theme-toggle"]} ${theme}`}
						title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
					>
						{theme === 'light' ? <FaMoon /> : <FaSun />}
					</button>

					{/* Logout Button */}
					<button onClick={handleLogout} className={`${style["logout-btn"]} ${theme}`}>
						{t.logout}
					</button>

					{/* Profile Button */}
					<button onClick={() => navigate('/login')} className={style['login-btn']}>
						<img src="/logo.png" alt="profile" />
					</button>
				</div>
			</div>
		</div>
	)
}

export default Navbar
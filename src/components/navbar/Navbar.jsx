import React from 'react'
import style from './Navbar.module.css'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
	const navigate = useNavigate()
	
	const handleLogout = () => {
		localStorage.removeItem('isLogin');
		navigate('/login');
	}
	
	return (
		<div className={style["navbar-container"]}>
			<div className={style["navbar"]}>
				<h4 className={style["brand"]}>Dashbord By <span className={style["brand-highlight"]}>MurodDev</span></h4>
				<div className={style["nav-controls"]}>
					<button onClick={handleLogout} className={style["logout-btn"]}>
						Logout
					</button>
					<button onClick={() => navigate('/login')} className={style['login-btn']}>
						<img src="/logo.png" alt="profile" />
					</button>
				</div>
			</div>
		</div>
	)
}

export default Navbar
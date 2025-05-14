import React from 'react'
import style from './Navbar.module.css'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
	const navigate = useNavigate()
	return (
		<div className='container'>
			<div className={style["navbar"]}>
				<h4>Dashbord By <span className='text-info'>MurodDev</span></h4>
				<div className={style["login-img"]}>
					<button onClick={()=> navigate('/login')} className={style['login-btn']}>
						<img src="/i'm (1).png" alt="" />
					</button>
				</div>
			</div>
		</div>
	)
}

export default Navbar
// SideBar.jsx
import React, { useState } from 'react'
import { BsWindowSidebar } from 'react-icons/bs'
import { FaCoins } from 'react-icons/fa'
import { GiRotaryPhone } from 'react-icons/gi'
import { LiaListSolid } from 'react-icons/lia'
import { FaBars, FaTimes } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import style from './SideBar.module.css'

const SideBar = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	const closeSidebar = () => {
		setSidebarOpen(false);
	};

	return (
		<>
			<div className={style['mobile-toggle']} onClick={toggleSidebar}>
				<FaBars size={24} />
			</div>
			
			<div className={`${style['sidebar']} ${sidebarOpen ? style['sidebar-open'] : ''}`}>
				<div className={style['sidebar-header']}>
					<div className={style['logo']}>
						<img className={style['logo-img']} src='/Recuva 1.svg' alt='' />
						<img
							className={style['logo-background']}
							src='/Group 3515.png'
							alt=''
						/>
					</div>
					<div className={style['close-button']} onClick={closeSidebar}>
						<FaTimes size={24} />
					</div>
				</div>
				
				<ul className={style['list-item']}>
					<li className={style['list-items']}>
						<NavLink to={'/'} onClick={closeSidebar}>
							<BsWindowSidebar size={24} />
							<span>Home</span>
						</NavLink>
					</li>
					<li className={style['list-items']}>
						<NavLink to={'/debit'} onClick={closeSidebar}>
							<LiaListSolid size={24} />
							<span>Debit</span>
						</NavLink>
					</li>
					<li className={style['list-items']}>
						<NavLink to={'/transactions'} onClick={closeSidebar}>
							<FaCoins size={24} />
							<span>Transactions</span>
						</NavLink>
					</li>
					<li className={style['list-items']}>
						<NavLink to={'/call'} onClick={closeSidebar}>
							<GiRotaryPhone size={24} />
							<span>Call</span>
						</NavLink>
					</li>
				</ul>
			</div>
			
			{sidebarOpen && <div className={style['backdrop']} onClick={closeSidebar}></div>}
		</>
	)
}

export default SideBar
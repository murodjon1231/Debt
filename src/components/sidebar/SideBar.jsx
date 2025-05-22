import React, { useState, useContext } from 'react'
import { BsWindowSidebar } from 'react-icons/bs'
import { FaCoins, FaBars, FaTimes, FaCalculator } from 'react-icons/fa'
import { GiRotaryPhone } from 'react-icons/gi'
import { LiaListSolid } from 'react-icons/lia'
import { NavLink } from 'react-router-dom'
import { AppContext } from '../../App'
import style from './SideBar.module.css'

const SideBar = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const { theme, t } = useContext(AppContext)

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen)
	}

	const closeSidebar = () => {
		setSidebarOpen(false)
	}

	const menuItems = [
		{
			path: '/',
			icon: <BsWindowSidebar size={24} />,
			label: t.home
		},
		{
			path: '/debit',
			icon: <LiaListSolid size={24} />,
			label: t.debit
		},
		{
			path: '/transactions',
			icon: <FaCoins size={24} />,
			label: t.transactions
		},
		{
			path: '/call',
			icon: <GiRotaryPhone size={24} />,
			label: t.call
		},
		{
			path: '/calculator',
			icon: <FaCalculator size={24} />,
			label: t.calculator
		}
	]

	return (
		<>
			<div className={`${style['mobile-toggle']} ${theme}`} onClick={toggleSidebar}>
				<FaBars size={24} />
			</div>
			
			<div className={`${style['sidebar']} ${theme} ${sidebarOpen ? style['sidebar-open'] : ''}`}>
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
					{menuItems.map((item) => (
						<li key={item.path} className={style['list-items']}>
							<NavLink 
								to={item.path} 
								onClick={closeSidebar}
								className={({ isActive }) => isActive ? style['active'] : ''}
							>
								{item.icon}
								<span>{item.label}</span>
							</NavLink>
						</li>
					))}
				</ul>
			</div>
			
			{sidebarOpen && <div className={style['backdrop']} onClick={closeSidebar}></div>}
		</>
	)
}

export default SideBar
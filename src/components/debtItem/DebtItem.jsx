import React, { useContext } from 'react'
import { Alert, Button, Row, Col, Badge } from 'react-bootstrap'
import { AppContext } from '../../App'

const DebtItem = ({
	id,
	firstName,
	lastName,
	phone,
	productName,
	debt,
	currency = 'USD',
	status,
	date,
	deleteDebt,
	editDebt,
	showReceipt
}) => {
	const { theme, t } = useContext(AppContext)
	
	const colors = {
		borrowing: 'danger',
		lending: 'primary',
	}

	const handleMoreClick = () => {
		showReceipt({
			id,
			firstName,
			lastName,
			phone,
			productName,
			debt,
			currency,
			status,
			date
		})
	}

	const formatCurrency = (amount, curr) => {
		const symbols = {
			USD: '$',
			UZS: 'сўм',
			EUR: '€',
			RUB: '₽'
		}
		
		return `${symbols[curr] || curr} ${parseFloat(amount).toLocaleString()}`
	}

	return (
		<Alert
			variant={`${
				'borrowing' === status.toLowerCase() ? colors.borrowing : colors.lending
			}`}
			className={`mb-3 ${theme === 'dark' ? 'border-secondary' : ''}`}
		>
			<Row>
				<Col xs={12} md={4} className="mb-2 mb-md-0">
					<h4>
						{firstName} {lastName}
					</h4>
					<a href={`tel:${phone}`} className="text-decoration-none">
						📱 {phone}
					</a>
					{productName && (
						<p className='mt-1 mb-1'>
							<Badge bg="secondary" className="me-1">📦</Badge>
							{productName}
						</p>
					)}
					<p className='mb-0'>
						<Badge 
							bg={status.toLowerCase() === 'borrowing' ? 'danger' : 'primary'}
						>
							{status.toLowerCase() === 'borrowing' ? t.borrowing : t.lending}
						</Badge>
					</p>
				</Col>
				<Col xs={12} md={3} className='text-center mb-2 mb-md-0'>
					<p className="fs-5 fw-bold mb-1">
						{formatCurrency(debt, currency)}
					</p>
					<p className="mb-0">📅 {date}</p>
				</Col>
				<Col xs={12} md={5} className='d-flex gap-2 justify-content-end align-items-center'>
					<Button 
						onClick={() => editDebt(id)} 
						variant='warning' 
						size="sm" 
						className="flex-grow-1 flex-md-grow-0"
					>
						{t.edit}
					</Button>
					<Button 
						onClick={() => deleteDebt(id)} 
						variant='danger' 
						size="sm" 
						className="flex-grow-1 flex-md-grow-0"
					>
						{t.delete}
					</Button>
					<Button 
						onClick={handleMoreClick} 
						variant='primary' 
						size="sm" 
						className="flex-grow-1 flex-md-grow-0"
					>
						{t.more}
					</Button>
				</Col>
			</Row>
		</Alert>
	)
}

export default DebtItem
import React from 'react'
import { Alert, Button, Row, Col } from 'react-bootstrap'

const DebtItem = ({
	id,
	firstName,
	lastName,
	phone,
	debt,
	status,
	date,
	deleteDebt,
	editDebt,
	showReceipt
}) => {
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
			debt,
			status,
			date
		})
	}

	return (
		<Alert
			variant={`${
				'borrowing' === status.toLowerCase() ? colors.borrowing : colors.lending
			}`}
			className='mb-3'
		>
			<Row>
				<Col xs={12} md={4} className="mb-2 mb-md-0">
					<h4>
						{firstName} {lastName}
					</h4>
					<a href={`tel:${phone}`}>{phone}</a>
					<p className='mt-2'>{status}</p>
				</Col>
				<Col xs={12} md={3} className='text-center mb-2 mb-md-0'>
					<p className="fs-5 fw-bold">${parseFloat(debt).toFixed(2)}</p>
					<p>{date}</p>
				</Col>
				<Col xs={12} md={5} className='d-flex gap-2 justify-content-end align-items-center'>
					<Button onClick={() => editDebt(id)} variant='warning' size="sm" className="flex-grow-1 flex-md-grow-0">
						Edit
					</Button>
					<Button onClick={() => deleteDebt(id)} variant='danger' size="sm" className="flex-grow-1 flex-md-grow-0">
						Delete
					</Button>
					<Button onClick={handleMoreClick} variant='primary' size="sm" className="flex-grow-1 flex-md-grow-0">
						More
					</Button>
				</Col>
			</Row>
		</Alert>
	)
}

export default DebtItem
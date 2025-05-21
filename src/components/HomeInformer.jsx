import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'

const HomeInformer = ({ debts }) => {
	let borrowingArr = debts.filter(
		item => item.status?.toLowerCase() === 'borrowing'
	)
	let lendingArr = debts.filter(
		item => item.status?.toLowerCase() === 'lending'
	)


	let sum_1 = 0,
		sum_2 = 0

	for (let i = 0; i < borrowingArr.length; i++) {
		sum_1 += +borrowingArr[i].debt
	}

	for (let i = 0; i < lendingArr.length; i++) {
		sum_2 += +lendingArr[i].debt
	}

	return (
		<Row className='g-3'>
			<Col xs={12} md={6}>
				<Card className="border-0 shadow-sm h-100">
					<Card.Body className="text-center">
						<div className="d-flex justify-content-center align-items-center gap-2 mb-2">
							<h4 className="mb-0">Borrowing</h4>
							<FaArrowDown className="text-danger" />
						</div>
						<Card.Text className="mb-2">
							Count: {borrowingArr?.length || 0} debts
						</Card.Text>
						<Card.Title className="text-danger fs-3">
							${sum_1.toFixed(2)}
						</Card.Title>
						<div className="text-muted small">Money you owe to others</div>
					</Card.Body>
				</Card>
			</Col>

			<Col xs={12} md={6}>
				<Card className="border-0 shadow-sm h-100">
					<Card.Body className="text-center">
						<div className="d-flex justify-content-center align-items-center gap-2 mb-2">
							<h4 className="mb-0">Lending</h4>
							<FaArrowUp className="text-primary" />
						</div>
						<Card.Text className="mb-2">
							Count: {lendingArr?.length || 0} debts
						</Card.Text>
						<Card.Title className="text-primary fs-3">
							${sum_2.toFixed(2)}
						</Card.Title>
						<div className="text-muted small">Money others owe to you</div>
					</Card.Body>
				</Card>
			</Col>

			<Col xs={12}>
				<Card className="border-0 shadow-sm">
					<Card.Body className="text-center">
						<h4>Balance</h4>
						<Card.Title className={`fs-2 ${sum_2 - sum_1 >= 0 ? 'text-success' : 'text-danger'}`}>
							${(sum_2 - sum_1).toFixed(2)}
						</Card.Title>
						<div className="text-muted small">Total money flow (lending - borrowing)</div>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	)
}

export default HomeInformer
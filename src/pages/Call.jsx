import React, { useState } from 'react'
import { Card, Row, Col, Form, InputGroup } from 'react-bootstrap'
import { FaSearch, FaPhone } from 'react-icons/fa'
import BankInfos from '../components/BankInfos'

const Call = () => {
	const [searchTerm, setSearchTerm] = useState('')
	
	const BANKS = [
		{
			bankName: 'Agrobank',
			phone: '1216',
			description: 'Customer service for Agrobank clients',
			logo: '/bank-logos/agrobank.png'
		},
		{
			bankName: 'Hamkorbank',
			phone: '1256',
			description: 'General inquiries and support',
			logo: '/bank-logos/hamkorbank.png'
		},
		{
			bankName: 'Asaka bank',
			phone: '1152',
			description: '24/7 customer support line',
			logo: '/bank-logos/asakabank.png'
		},
		{
			bankName: 'Анор Банк',
			phone: '1290',
			description: 'Customer service and loan inquiries',
			logo: '/bank-logos/anorbank.png'
		},
		{
			bankName: 'NBU',
			phone: '1333',
			description: 'National Bank of Uzbekistan support line',
			logo: '/bank-logos/nbu.png'
		},
		{
			bankName: 'Kapital Bank',
			phone: '1244',
			description: 'Card services and general inquiries',
			logo: '/bank-logos/kapitalbank.png'
		},
	]
	
	const filteredBanks = BANKS.filter(bank => 
		bank.bankName.toLowerCase().includes(searchTerm.toLowerCase())
	);
	
	return (
		<div className='container pt-5'>
			<div className='page'>
				<div className="d-flex align-items-center mb-3">
					<FaPhone className="text-primary me-3" size={20} />
					<h3 className="mb-0">Bank Contact Information</h3>
				</div>
				
				<InputGroup className="mb-4">
					<InputGroup.Text>
						<FaSearch />
					</InputGroup.Text>
					<Form.Control
						placeholder="Search banks..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</InputGroup>
				
				<Row xs={1} md={2} className="g-3">
					{filteredBanks.length > 0 ? (
						filteredBanks.map((bank, index) => (
							<Col key={index}>
								<BankInfos {...bank} />
							</Col>
						))
					) : (
						<Col xs={12} className="text-center py-4">
							<p className="text-muted">No banks found matching your search.</p>
						</Col>
					)}
				</Row>
				
				<Card className="mt-4 border-0 shadow-sm">
					<Card.Body>
						<Card.Title>Need Help?</Card.Title>
						<Card.Text>
							Contact our support line at <a href="tel:+998123456789">+998 12 345 67 89</a> for any assistance with the debt management system.
						</Card.Text>
					</Card.Body>
				</Card>
			</div>
		</div>
	)
}

export default Call
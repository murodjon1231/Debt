import React, { useState } from 'react'
import { Form, InputGroup, Card, Row, Col } from 'react-bootstrap'
import { FaDollarSign, FaExchangeAlt } from 'react-icons/fa'

const Transactions = () => {
	const [usd, setUsd] = useState(100)

	const exchangeRates = {
		UZS: 12889,
		KRW: 1392,
		TRY: 38.76,
		EUR: 0.93,
		GBP: 0.79,
		CNY: 7.24,
	}
	
	const handleChange = (e) => {
		const value = parseFloat(e.target.value);
		setUsd(isNaN(value) ? 0 : value);
	};
	
	const formatCurrency = (value) => {
		return value.toLocaleString('en-US', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		});
	};

	return (
		<div className='container'>
			<div className='page'>
				<div className="d-flex align-items-center mb-4">
					<FaExchangeAlt className="text-primary me-3" size={24} />
					<h3 className="mb-0">USD Currency Converter</h3>
				</div>
				
				<Card className="mb-4 border-0 shadow-sm">
					<Card.Body>
						<label htmlFor="usdInput" className="form-label">USD Amount</label>
						<InputGroup className='mb-3'>
							<InputGroup.Text><FaDollarSign /></InputGroup.Text>
							<Form.Control
								id="usdInput"
								type="number"
								value={usd}
								onChange={handleChange}
								min="0"
								step="0.01"
							/>
						</InputGroup>
					</Card.Body>
				</Card>
				
				<h5 className="mb-3">Conversion Results</h5>
				
				<Row xs={1} md={2} lg={3} className="g-3">
					{Object.entries(exchangeRates).map(([currency, rate]) => {
						const convertedAmount = usd * rate;
						const formattedAmount = formatCurrency(convertedAmount);
						
						return (
							<Col key={currency}>
								<Card className="h-100 border-0 shadow-sm currency-card">
									<Card.Body className="d-flex flex-column align-items-center">
										<div className="currency-flag mb-2">
											{currency === 'UZS' && '🇺🇿'}
											{currency === 'KRW' && '🇰🇷'}
											{currency === 'TRY' && '🇹🇷'}
											{currency === 'EUR' && '🇪🇺'}
											{currency === 'GBP' && '🇬🇧'}
											{currency === 'CNY' && '🇨🇳'}
										</div>
										<h4 className="text-primary mb-1">{currency}</h4>
										<Card.Text className="mb-1 text-muted small">
											1 USD = {formatCurrency(rate)} {currency}
										</Card.Text>
										<div className="mt-2 text-center">
											<h5 className="mb-0">{formattedAmount}</h5>
											<small className="text-muted">{currency}</small>
										</div>
									</Card.Body>
								</Card>
							</Col>
						);
					})}
				</Row>
				
				<div className="text-center mt-4">
					<p className="text-muted small">Exchange rates are for demonstration purposes only.</p>
				</div>
			</div>
		</div>
	)
}

export default Transactions
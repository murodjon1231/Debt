import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Alert from 'react-bootstrap/Alert'

const Transactions = () => {
	const [usd, setUsd] = useState(100)

	const exchangeRates = {
		UZS: 12889,
		KRW: 1392,
		TRY: 38.76,
	}
	const uzs = (usd * exchangeRates.UZS).toLocaleString().split(',').join(' ')
	const krw = (usd * exchangeRates.KRW).toLocaleString().split(',').join(' ')
	const try_ = (usd * exchangeRates.TRY).toLocaleString().split(',').join(' ')

	return (
		<div className='container'>
			<div className='page'>
				<h4>USD Currency Converter</h4>
				<InputGroup className='mb-3 w-25'>
					<Form.Control
						type="number"
						value={usd}
						onChange={e => setUsd(+e.target.value)}
					/>
				</InputGroup>

				<Alert className='w-25 py-2'>🇺🇿 {uzs} UZS</Alert>
				<Alert className='w-25 py-2'>🇰🇷 {krw} KRW</Alert>
				<Alert className='w-25 py-2'>🇹🇷 {try_} TRY</Alert>
			</div>
		</div>
	)
}

export default Transactions

import React, { useState, useContext } from 'react'
import { Button, Form, InputGroup, Modal, Spinner } from 'react-bootstrap'
import DebtItem from '../components/debtItem/DebtItem'
import Empty from '../components/Empty'
import ReceiptModal from '../components/ReceiptModal'
import { AppContext } from '../App'

const Debit = ({
	debts = [],
	debt,
	show,
	validated,
	selected,
	search,
	setSearch,
	handleSubmit,
	handleClose,
	handleChange,
	deleteDebt,
	editDebt,
	openModal,
	loading,
	fetchDebts
}) => {
	const [showReceipt, setShowReceipt] = useState(false)
	const [selectedDebt, setSelectedDebt] = useState(null)
	const [selectedDate, setSelectedDate] = useState('')
	const { theme, t } = useContext(AppContext)

	const handleShowReceipt = (debtItem) => {
		setSelectedDebt(debtItem)
		setShowReceipt(true)
	}

	const handleCloseReceipt = () => {
		setShowReceipt(false)
		setSelectedDebt(null)
	}

	const filteredDebts = debts.filter(item =>
		(
			(typeof item.firstName === 'string' &&
				item.firstName.toLowerCase().includes(search.toLowerCase().trim())) ||
			(typeof item.productName === 'string' &&
				item.productName.toLowerCase().includes(search.toLowerCase().trim()))
		) &&
		(selectedDate ? item.date === selectedDate : true)
	)

	return (
		<div className={`container pt-5 ${theme}`}>
			<div className="row g-3 mb-3">
				<div className="col-md-6">
					<InputGroup>
						<Form.Control
							value={search}
							onChange={e => setSearch(e.target.value)}
							placeholder={t.search}
							className={theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}
						/>
					</InputGroup>
				</div>
				<div className="col-md-3">
					<Form.Control
						type='date'
						value={selectedDate}
						onChange={e => setSelectedDate(e.target.value)}
						className={theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}
					/>
				</div>
				<div className="col-md-3 d-flex gap-2">
					<Button onClick={openModal} variant='primary'>{t.addDebt}</Button>
					<Button variant='outline-secondary' onClick={() => setSelectedDate('')}>
						{t.allDates || 'All Dates'}
					</Button>
				</div>
			</div>

			<div className='page'>
				{loading ? (
					<div className="text-center py-5">
						<Spinner animation="border" variant="primary" />
						<p className="mt-2">Loading debts...</p>
					</div>
				) : filteredDebts.length > 0 ? (
					filteredDebts.map(item => (
						<DebtItem
							key={item.id}
							{...item}
							editDebt={editDebt}
							deleteDebt={deleteDebt}
							showReceipt={handleShowReceipt}
						/>
					))
				) : (
					<Empty />
				)}
			</div>

			<Modal show={show} onHide={handleClose} className={theme}>
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Modal.Header closeButton className={theme === 'dark' ? 'bg-dark text-white' : ''}>
						<Modal.Title>{selected == null ? t.addDebt : t.updateDebt}</Modal.Title>
					</Modal.Header>
					<Modal.Body className={theme === 'dark' ? 'bg-dark text-white' : ''}>
						<Form.Group className='mb-3' controlId='firstName'>
							<Form.Label>{t.firstName}</Form.Label>
							<Form.Control
								onChange={handleChange}
								required
								type='text'
								value={debt.firstName || ''}
								className={theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}
							/>
							<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
							<Form.Control.Feedback type='invalid'>Please fill!</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className='mb-3' controlId='lastName'>
							<Form.Label>{t.lastName}</Form.Label>
							<Form.Control
								onChange={handleChange}
								required
								type='text'
								value={debt.lastName || ''}
								className={theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}
							/>
							<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
							<Form.Control.Feedback type='invalid'>Please fill!</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className='mb-3' controlId='phone'>
							<Form.Label>{t.phone}</Form.Label>
							<Form.Control
								onChange={handleChange}
								required
								type='text'
								value={debt.phone || ''}
								className={theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}
							/>
							<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
							<Form.Control.Feedback type='invalid'>Please fill!</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className='mb-3' controlId='productName'>
							<Form.Label>{t.productName}</Form.Label>
							<Form.Control
								onChange={handleChange}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										e.preventDefault()
										const lines = (debt.productName || '').split('\n')
										const nextLine = `${lines.length + 1}. `
										const newValue = debt.productName
											? debt.productName + '\n' + nextLine
											: '1. '
										handleChange({
											target: {
												id: 'productName',
												value: newValue
											}
										})
									}
								}}
								required
								as="textarea"
								rows={4}
								value={debt.productName || ''}
								placeholder="e.g., iPhone 13, Car, Laptop..."
								className={theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}
							/>
							<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
							<Form.Control.Feedback type='invalid'>Please fill!</Form.Control.Feedback>
						</Form.Group>

						<div className="row">
							<div className="col-md-8">
								<Form.Group className='mb-3' controlId='debt'>
									<Form.Label>{t.debtAmount}</Form.Label>
									<Form.Control
										onChange={handleChange}
										required
										type='number'
										value={debt.debt || ''}
										className={theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}
									/>
									<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
									<Form.Control.Feedback type='invalid'>Please fill!</Form.Control.Feedback>
								</Form.Group>
							</div>

							<div className="col-md-4">
								<Form.Group className='mb-3' controlId='currency'>
									<Form.Label>{t.currency}</Form.Label>
									<Form.Select
										value={debt.currency || 'USD'}
										onChange={handleChange}
										className={theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}
									>
										<option value='USD'>USD ($)</option>
										<option value='UZS'>UZS (сўм)</option>
										<option value='EUR'>EUR (€)</option>
										<option value='RUB'>RUB (₽)</option>
									</Form.Select>
								</Form.Group>
							</div>
						</div>

						<Form.Group className='my-3' controlId='status'>
							<Form.Label>{t.status}</Form.Label>
							<Form.Select
								value={debt.status || 'Borrowing'}
								onChange={handleChange}
								className={theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}
							>
								<option value='Borrowing'>{t.borrowing}</option>
								<option value='Lending'>{t.lending}</option>
							</Form.Select>
						</Form.Group>

						<Form.Group className='mb-3' controlId='date'>
							<Form.Label>{t.date}</Form.Label>
							<Form.Control
								onChange={handleChange}
								required
								type='date'
								value={debt.date || ''}
								className={theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}
							/>
							<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
							<Form.Control.Feedback type='invalid'>Please fill!</Form.Control.Feedback>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer className={theme === 'dark' ? 'bg-dark text-white' : ''}>
						<Button variant='secondary' onClick={handleClose}>{t.close}</Button>
						<Button type='submit' variant='primary' disabled={loading}>
							{loading ? (
								<>
									<Spinner size="sm" animation="border" className="me-2" />
									Processing...
								</>
							) : selected == null ? t.addDebt : t.update}
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>

			{selectedDebt && (
				<ReceiptModal
					show={showReceipt}
					handleClose={handleCloseReceipt}
					debt={selectedDebt}
				/>
			)}
		</div>
	)
}

export default Debit

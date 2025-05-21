import React, { useState } from 'react'
import { Button, Form, InputGroup, Modal, Spinner } from 'react-bootstrap'
import DebtItem from '../components/debtItem/DebtItem'
import Empty from '../components/Empty'
import ReceiptModal from '../components/ReceiptModal'

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

	const handleShowReceipt = (debtItem) => {
		setSelectedDebt(debtItem)
		setShowReceipt(true)
	}

	const handleCloseReceipt = () => {
		setShowReceipt(false)
		setSelectedDebt(null)
	}

	const filteredDebts = debts.filter(item =>
		typeof item.firstName === 'string' &&
		item.firstName.toLowerCase().includes(search.toLowerCase().trim())
	)

	return (
		<div className='container'>
			<InputGroup className='mb-3'>
				<Form.Control
					value={search}
					onChange={e => setSearch(e.target.value)}
					placeholder="Search by first name..."
				/>
				<Button onClick={openModal} variant='primary' id='button-addon1'>
					Add debt
				</Button>
			</InputGroup>

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

			{/* Add/Edit Debt Modal */}
			<Modal show={show} onHide={handleClose}>
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Modal.Header closeButton>
						<Modal.Title>{selected == null ? 'Add debt' : 'Update debt'}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group className='mb-3' controlId='firstName'>
							<Form.Label>First name</Form.Label>
							<Form.Control
								onChange={handleChange}
								required
								type='text'
								value={debt.firstName || ''}
							/>
							<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
							<Form.Control.Feedback type='invalid'>Please fill!</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className='mb-3' controlId='lastName'>
							<Form.Label>Last name</Form.Label>
							<Form.Control
								onChange={handleChange}
								required
								type='text'
								value={debt.lastName || ''}
							/>
							<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
							<Form.Control.Feedback type='invalid'>Please fill!</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className='mb-3' controlId='phone'>
							<Form.Label>Phone</Form.Label>
							<Form.Control
								onChange={handleChange}
								required
								type='text'
								value={debt.phone || ''}
							/>
							<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
							<Form.Control.Feedback type='invalid'>Please fill!</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className='mb-3' controlId='debt'>
							<Form.Label>Debt amount</Form.Label>
							<Form.Control
								onChange={handleChange}
								required
								type='number'
								value={debt.debt || ''}
							/>
							<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
							<Form.Control.Feedback type='invalid'>Please fill!</Form.Control.Feedback>
						</Form.Group>

						<Form.Group className='my-3' controlId='status'>
							<Form.Label>Status</Form.Label>
							<Form.Select
								value={debt.status || 'Borrowing'}
								onChange={handleChange}
							>
								<option value='Borrowing'>Borrowing</option>
								<option value='Lending'>Lending</option>
							</Form.Select>
						</Form.Group>

						<Form.Group className='mb-3' controlId='date'>
							<Form.Label>Date</Form.Label>
							<Form.Control
								onChange={handleChange}
								required
								type='date'
								value={debt.date || ''}
							/>
							<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
							<Form.Control.Feedback type='invalid'>Please fill!</Form.Control.Feedback>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={handleClose}>
							Close
						</Button>
						<Button type='submit' variant='primary' disabled={loading}>
							{loading ? (
								<>
									<Spinner size="sm" animation="border" className="me-2" />
									Processing...
								</>
							) : selected == null ? 'Add debt' : 'Update'}
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>

			{/* Receipt Modal */}
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

import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'

const Empty = () => {
	return (
		<div style={{minHeight: '200px'}} className='d-flex flex-column align-items-center justify-content-center py-5'>
			<FaExclamationTriangle className="text-warning mb-3" size={40} />
			<h4 className='text-danger text-center'>No debts found</h4>
			<p className="text-muted text-center">Add a new debt using the button above</p>
		</div>
	)
}

export default Empty
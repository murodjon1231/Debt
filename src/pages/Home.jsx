import React from 'react'
import HomeInformer from '../components/HomeInformer'
import { Spinner } from 'react-bootstrap'

const Home = ({ debts, loading }) => {
	return (
		<div className='container pt-5'>
			<div className='page'>
				<div className='row'>
					<div className='col-md-6'>
						<img className='w-100 mb-3' src='/value.png' alt='image' />
					</div>
					<div className='col-md-6'>
						<img className='w-100 mb-3' src='/Chart.png' alt='image' />
					</div>
				</div>
				<hr />
				{loading ? (
					<div className="text-center py-4">
						<Spinner animation="border" variant="primary" />
						<p className="mt-2">Loading data...</p>
					</div>
				) : (
					<HomeInformer debts={debts} />
				)}
			</div>
		</div>
	)
}

export default Home
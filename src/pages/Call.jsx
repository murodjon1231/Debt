import React from 'react'
import BankInfos from '../components/BankInfos'

const Call = () => {
	const BANKS = [
		{
			bankName: 'Agrobank',
			phone: '1216',
		},
		{
			bankName: 'Hamkorbank',
			phone: '1256',
		},
		{
			bankName: 'Asaka bank',
			phone: '1152',
		},
		{
			bankName: 'Анор Банк',
			phone: '1290',
		},
	]
	return (
		<div className='container'>
			<div className='page'>
				{BANKS?.map((item, index) => (
					<BankInfos key={index} {...item} />
				))}
			</div>
		</div>
	)
}

export default Call
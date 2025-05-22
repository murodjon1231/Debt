import React, { useRef, useContext } from 'react'
import { Modal, Button } from 'react-bootstrap'
import html2canvas from 'html2canvas'
import { AppContext } from '../App'

const ReceiptModal = ({ show, handleClose, debt }) => {
  const receiptRef = useRef(null)
  const { theme, t } = useContext(AppContext)

  const handlePrint = () => {
    const printContent = document.getElementById('receipt-content')
    const originalContents = document.body.innerHTML
    
    document.body.innerHTML = printContent.outerHTML
    window.print()
    document.body.innerHTML = originalContents
    window.location.reload()
  }

  const handleDownloadImage = async () => {
    if (!receiptRef.current) return
    
    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      })
      
      const image = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      
      link.href = image
      link.download = `Debt-Receipt-${debt.firstName}-${debt.lastName}-${debt.productName || 'Product'}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error generating image:', error)
    }
  }

  if (!debt) return null

  const formattedDate = new Date(debt.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

const formatCurrency = (amount, currency) => {
  const symbols = {
    USD: '$',
    UZS: 'сўм',
    EUR: '€',
    RUB: '₽'
  }
  
  return `${symbols[currency] || currency} ${parseFloat(amount).toLocaleString()}`
}


  return (
    <Modal show={show} onHide={handleClose} centered size="md" className={theme}>
      <Modal.Header closeButton className={theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}>
        <Modal.Title>Debt Receipt</Modal.Title>
      </Modal.Header>
      <Modal.Body className={theme === 'dark' ? 'bg-dark text-white' : ''}>
        <div id="receipt-content" ref={receiptRef} className="p-3 bg-white text-dark">
          <div className="text-center mb-4">
            <h3 className="mb-0">DEBT RECEIPT</h3>
            <small className="text-muted">Cartmon Finance Management</small>
            <hr className="my-2" />
          </div>
          
          <div className="receipt-details">
            <div className="mb-3 d-flex justify-content-between">
              <strong>Receipt No:</strong>
              <span>#{debt.id}</span>
            </div>
            
            <div className="mb-3 d-flex justify-content-between">
              <strong>Date:</strong>
              <span>{formattedDate}</span>
            </div>
            
            <div className="mb-3 d-flex justify-content-between">
              <strong>Name:</strong>
              <span>{debt.firstName} {debt.lastName}</span>
            </div>
            
            <div className="mb-3 d-flex justify-content-between">
              <strong>Phone:</strong>
              <span>{debt.phone}</span>
            </div>
            
            {debt.productName && (
              <div className="mb-3 d-flex justify-content-between">
                <strong>Product:</strong>
                <span>{debt.productName}</span>
              </div>
            )}
            
            <div className="mb-3 d-flex justify-content-between">
              <strong>Transaction Type:</strong>
              <span>{debt.status}</span>
            </div>
            
            <div className="mb-3 d-flex justify-content-between">
              <strong>Currency:</strong>
              <span>{debt.currency || 'USD'}</span>
            </div>
            
            <hr className="my-3" />
            
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <h5 className="mb-0">AMOUNT:</h5>
              <h5 className={`mb-0 ${debt.status.toLowerCase() === 'borrowing' ? 'text-danger' : 'text-primary'}`}>
                {formatCurrency(debt.debt, debt.currency || 'USD')}
              </h5>
            </div>
            
            <hr className="my-3" />
            
            <div className="text-center mt-4">
              <p className="mb-1">
                This is {debt.status.toLowerCase() === 'borrowing' ? 'an amount borrowed from' : 'a loan given to'} {debt.firstName} {debt.lastName}
                {debt.productName && ` for ${debt.productName}`}
              </p>
              <small className="text-muted">Thank you for using Cartmon Finance Management</small>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className={theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}>
        <Button variant="secondary" onClick={handleClose}>
          {t.close}
        </Button>
        <Button variant="success" onClick={handlePrint}>
          <i className="bi bi-printer"></i> Print
        </Button>
        <Button variant="primary" onClick={handleDownloadImage}>
          <i className="bi bi-download"></i> Save as Image
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ReceiptModal
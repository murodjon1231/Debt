import React, { useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import html2canvas from 'html2canvas';

const ReceiptModal = ({ show, handleClose, debt }) => {
  const receiptRef = useRef(null);

  const handlePrint = () => {
    const printContent = document.getElementById('receipt-content');
    const originalContents = document.body.innerHTML;
    
    document.body.innerHTML = printContent.outerHTML;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const handleDownloadImage = async () => {
    if (!receiptRef.current) return;
    
    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      
      link.href = image;
      link.download = `Debt-Receipt-${debt.firstName}-${debt.lastName}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  if (!debt) return null;

  const formattedDate = new Date(debt.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Modal show={show} onHide={handleClose} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>Debt Receipt</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div id="receipt-content" ref={receiptRef} className="p-3 bg-white">
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
            
            <div className="mb-3 d-flex justify-content-between">
              <strong>Transaction Type:</strong>
              <span>{debt.status}</span>
            </div>
            
            <hr className="my-3" />
            
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <h5 className="mb-0">AMOUNT:</h5>
              <h5 className={`mb-0 ${debt.status.toLowerCase() === 'borrowing' ? 'text-danger' : 'text-primary'}`}>
                ${parseFloat(debt.debt).toFixed(2)}
              </h5>
            </div>
            
            <hr className="my-3" />
            
            <div className="text-center mt-4">
              <p className="mb-1">This is {debt.status.toLowerCase() === 'borrowing' ? 'an amount borrowed from' : 'a loan given to'} {debt.firstName} {debt.lastName}</p>
              <small className="text-muted">Thank you for using Cartmon Finance Management</small>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={handlePrint}>
          <i className="bi bi-printer"></i> Print
        </Button>
        <Button variant="primary" onClick={handleDownloadImage}>
          <i className="bi bi-download"></i> Save as Image
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReceiptModal;
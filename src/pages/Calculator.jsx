import React, { useState, useContext, useEffect } from 'react'
import { Button, Card, Row, Col } from 'react-bootstrap'
import { AppContext } from '../App'

const Calculator = () => {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [history, setHistory] = useState([]) // tarix uchun
  const { theme, t } = useContext(AppContext)

  const calculate = (firstOperand, secondOperand, operation) => {
    switch (operation) {
      case '+': return firstOperand + secondOperand
      case '-': return firstOperand - secondOperand
      case '×': return firstOperand * secondOperand
      case '÷': return secondOperand === 0 ? 'Error' : firstOperand / secondOperand
      default: return secondOperand
    }
  }

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const inputOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (operation && !waitingForOperand) {
      // hisoblash va natijani historyga qo'shish
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      if (newValue === 'Error') {
        setDisplay('Error')
        setPreviousValue(null)
        setOperation(null)
        setWaitingForOperand(true)
        setHistory(h => [...h, `${currentValue} ${operation} ${inputValue} = Error`])
        return
      }

      setDisplay(String(newValue))
      setPreviousValue(newValue)
      setHistory(h => [...h, `${currentValue} ${operation} ${inputValue} = ${newValue}`])
    } else {
      setPreviousValue(inputValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation === '=' ? null : nextOperation)
  }

  const clearAll = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
    setHistory([])
  }

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const deleteLast = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay('0')
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isNaN(e.key)) {
        inputNumber(parseInt(e.key))
      } else {
        switch (e.key) {
          case '+': inputOperation('+'); break
          case '-': inputOperation('-'); break
          case '*': inputOperation('×'); break
          case '/': inputOperation('÷'); break
          case 'Enter': inputOperation('='); break
          case '=': inputOperation('='); break
          case '.': inputDot(); break
          case 'Backspace': deleteLast(); break
          case 'Escape': clearAll(); break
          default: break
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [display, operation, previousValue, waitingForOperand])

  const buttonStyle = {
    height: '60px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    margin: '2px'
  }

  const operatorStyle = {
    ...buttonStyle,
    backgroundColor: theme === 'dark' ? '#007bff' : '#007bff',
    borderColor: '#007bff',
    color: 'white'
  }

  const numberStyle = {
    ...buttonStyle,
    backgroundColor: theme === 'dark' ? '#495057' : '#f8f9fa',
    borderColor: theme === 'dark' ? '#6c757d' : '#dee2e6',
    color: theme === 'dark' ? 'white' : 'black'
  }

  const clearStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
    borderColor: '#dc3545',
    color: 'white'
  }

  return (
    <div className={`container pt-5 ${theme}`}>
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className={`${theme === 'dark' ? 'bg-dark text-white border-secondary' : ''} shadow-lg border-0 rounded`}>
            <Card.Header className="text-center border-0">
              <h3>{t?.basicCalculator || "Calculator"}</h3>
            </Card.Header>
            <Card.Body>
              <div
                className={`p-3 mb-3 text-end ${theme === 'dark' ? 'bg-secondary text-white' : 'bg-light'}`}
                style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  minHeight: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  borderRadius: '8px',
                  wordBreak: 'break-all',
                  border: '2px solid #ccc',
                  boxShadow: 'inset 0 0 5px rgba(0,0,0,0.1)'
                }}
              >
                {display}
              </div>

              <Row className="g-1 mb-3">
                {/* AC, ⌫, ÷ */}
                <Col xs={6}><Button style={clearStyle} className="w-100" onClick={clearAll}>{t?.clear || 'AC'}</Button></Col>
                <Col xs={3}><Button variant="warning" style={buttonStyle} className="w-100" onClick={deleteLast}>⌫</Button></Col>
                <Col xs={3}><Button style={operatorStyle} className="w-100" onClick={() => inputOperation('÷')}>÷</Button></Col>

                {/* 7 8 9 × */}
                {[7, 8, 9].map(num => (
                  <Col xs={3} key={num}><Button style={numberStyle} className="w-100" onClick={() => inputNumber(num)}>{num}</Button></Col>
                ))}
                <Col xs={3}><Button style={operatorStyle} className="w-100" onClick={() => inputOperation('×')}>×</Button></Col>

                {/* 4 5 6 - */}
                {[4, 5, 6].map(num => (
                  <Col xs={3} key={num}><Button style={numberStyle} className="w-100" onClick={() => inputNumber(num)}>{num}</Button></Col>
                ))}
                <Col xs={3}><Button style={operatorStyle} className="w-100" onClick={() => inputOperation('-')}>-</Button></Col>

                {/* 1 2 3 + */}
                {[1, 2, 3].map(num => (
                  <Col xs={3} key={num}><Button style={numberStyle} className="w-100" onClick={() => inputNumber(num)}>{num}</Button></Col>
                ))}
                <Col xs={3}><Button style={operatorStyle} className="w-100" onClick={() => inputOperation('+')}>+</Button></Col>

                {/* 0 . = */}
                <Col xs={6}><Button style={numberStyle} className="w-100" onClick={() => inputNumber(0)}>0</Button></Col>
                <Col xs={3}><Button style={numberStyle} className="w-100" onClick={inputDot}>.</Button></Col>
                <Col xs={3}>
                  <Button
                    variant="success"
                    style={{ ...operatorStyle, backgroundColor: '#28a745', borderColor: '#28a745' }}
                    className="w-100"
                    onClick={() => inputOperation('=')}
                  >
                    =
                  </Button>
                </Col>
              </Row>

              {/* History bo'limi */}
              <div
                style={{
                  maxHeight: '150px',
                  overflowY: 'auto',
                  backgroundColor: theme === 'dark' ? '#343a40' : '#f1f3f5',
                  padding: '10px',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  color: theme === 'dark' ? '#ddd' : '#333'
                }}
              >
                <strong>{t?.history || "History:"}</strong>
                {history.length === 0 ? (
                  <p>{t?.noHistory || "No operations yet"}</p>
                ) : (
                  <ul style={{ paddingLeft: '15px' }}>
                    {history.map((entry, idx) => (
                      <li key={idx} style={{ marginBottom: '4px' }}>{entry}</li>
                    ))}
                  </ul>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Calculator

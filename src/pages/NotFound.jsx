import React from 'react'

const NotFound = () => {
  return (
    <div className='text-center pt-5'>
        <h1>Page Not Found</h1>
        <p>Sorry, but the page you're looking for doesn't exist.</p>
        <a href="/"><button className='p-2 rounded-5'>Go back to Homepage</button></a>
    </div>
  )
}

export default NotFound
import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import Error from './Error'
import SectionWrapper from '../hoc/SectionWrapper'
import { styles } from '../styles'
const PaymentStatus = () => {
  const location = useLocation()
  const renderData = () => {
    try {
      const boughtData = location.state.detail

      return (
        <SectionWrapper>
          <h3 className={`${styles.heroHeadText} text-accent`}>Payment Successfull</h3>
          <div className='bg-gray-800 border rounded-lg p-4 container'>
            <p className={`${styles.paragraph}`}>Successfully bought</p> 
            <br/>
            <span>
            {boughtData.name},
            KSH {boughtData.price}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM227.3 387.3l184-184c6.2-6.2 6.2-16.4 0-22.6l-22.6-22.6c-6.2-6.2-16.4-6.2-22.6 0L216 308.1l-70.1-70.1c-6.2-6.2-16.4-6.2-22.6 0l-22.6 22.6c-6.2 6.2-6.2 16.4 0 22.6l104 104c6.2 6.2 16.4 6.2 22.6 0z"/></svg>
            </span>
            <Link to="/all-orders/">Go to orders page</Link>
          </div>
        </SectionWrapper>
        
      )
    } catch (error) {
      return <Error>Payment status not available</Error>
    
  } 
  }
  return renderData()
  
}

export default PaymentStatus
import React from 'react'
import UploadProduk from '../admin/uploadProduk'
import AllProduct from '../admin/allProduct'

const product = () => {
  return (
    <div className='p-4 sm:ml-64'>
        <UploadProduk/>
        <AllProduct/>
    </div>
  )
}

export default product
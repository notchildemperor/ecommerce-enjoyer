import React from 'react'
import Slider from '../components/slider'
import Category from '../assetsPage/category'
import Popular from '../assetsPage/popular'
import Information from '../assetsPage/information'

const home = () => {
  return (
    <div className='bg-slate-900'>
        <Slider/>
        <Category/>
        <Popular/>
        <Information/>
    </div>
  )
}

export default home
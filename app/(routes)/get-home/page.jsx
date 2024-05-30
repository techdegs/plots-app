import Footer from '@/app/_components/Footer'
import ListingMapView from '@/app/_components/ListingMapView'
import React from 'react'

const Listings = () => {
  return (
    <div className="w-full pb-14 bg-white">
      <div className="px-10">
        <ListingMapView type='For Sell' />
      </div>
    </div>
  )
}

export default Listings
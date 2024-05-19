import ListingMapView from '@/app/_components/ListingMapView'
import React from 'react'

const Listings = () => {
  return (
    <div className="w-full">
      <div className="px-10 p-10">
        <ListingMapView type='For Sell' />
      </div>
    </div>
  )
}

export default Listings
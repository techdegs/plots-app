
import Featured from '@/app/_components/Featured'
import Footer from '@/app/_components/Footer'
import Hero from '@/app/_components/Hero'
import HomeFilters from '@/app/_components/HomeFilters'
import Invests from '@/app/_components/Invests'
import Speciality from '@/app/_components/Specialty'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Hero />
      <HomeFilters />
      <Invests />
      <Speciality />
      <Featured />
      <Footer />
    </div>
  )
}

export default Home
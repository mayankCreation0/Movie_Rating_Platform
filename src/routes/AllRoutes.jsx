import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Movie from '../components/Movie'
import MovieDetailsPage from '../components/MovieDetails'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'

function AllRoutes() {
  return (
    <div>
          {/* <Navbar />
          <Banner /> */}
          
          <Routes>
              <Route path='/' element={<Movie />} >
              <Route path='/signup' element={<SignupPage />} />
              <Route path='/login' element={<LoginPage />} />
              </Route>
              <Route path='/movies/:id' element={<MovieDetailsPage/>}/>
          </Routes>
    </div>
  )
}

export default AllRoutes

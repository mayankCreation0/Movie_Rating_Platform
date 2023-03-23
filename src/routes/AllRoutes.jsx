import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Movie from '../components/Movie'
import MovieDetailsPage from '../components/MovieDetails'
import { Context } from '../context/Context'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'

function AllRoutes() {
  const { auth } = useContext(Context);
  return (
    <div>
      {/* <Navbar />
          <Banner /> */}

      <Routes>
        <Route path='/' element={<Movie />} >
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Route>
        {auth ? <Route path='/movies/:id' element={<MovieDetailsPage />} /> : null}
      </Routes>
    </div>
  )
}

export default AllRoutes

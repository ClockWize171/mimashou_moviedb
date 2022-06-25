import './App.css';
import {
  NotFound,
  Home,
  Trending,
  TopRated,
  Upcoming,
  Login,
  About,
  SearchPage,
  Account,
  MovieDetail
} from './pages';
import { Navbar, Search, ProtectedRoute } from './components'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Search />
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route exact path='/' element={<Home />} />
          <Route path='/popular' element={<Trending />} />
          <Route path='/top_rated' element={<TopRated />} />
          <Route path='/upcoming' element={<Upcoming />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/account' element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          } />
          <Route path='/movie/:tmdbID' element={<MovieDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

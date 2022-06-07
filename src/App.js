import './App.css';
import { NotFound, Home, Trending, TopRated, Upcoming, Login } from './pages';
import { Navbar, Search } from './components'
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
          <Route path='/trending' element={<Trending />} />
          <Route path='/top_rated' element={<TopRated />} />
          <Route path='/upcoming' element={<Upcoming />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

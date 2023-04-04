import './App.css'
import AppBar from '@mui/material/AppBar';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './routes/Home';
import Customers from './routes/Customers';
import Trainings from './routes/Trainings';
import NotFound from './routes/NotFound';

function App() {
  return (
    <div className="App">
      <AppBar position="static">

      </AppBar>
      <h1>Personal Trainer</h1>
      <BrowserRouter>
        <Link to="/">Home</Link>{' '}
        <Link to="/customers">Customers</Link>{' '}
        <Link to="/trainings">Trainings</Link>{' '}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/trainings" element={<Trainings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

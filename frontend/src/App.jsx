import{ BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import SendMoney from './pages/SendMoney';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import axios from 'axios';
import { ProtectedRoute } from './pages/Dashboard';


axios.defaults.baseURL = "http://localhost:5000/api/v1"; // optional base URL
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />   
          <Route path='/signin' element={<Signin />} />
          <Route path='/send' element={<SendMoney />} />
          <Route path='/dashboard' element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;

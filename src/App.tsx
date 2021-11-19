import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './components/Login'
import { ProtectedLayout } from './components/ProtectedLayout'
import { Register } from './components/Register'
import { AuthProvider } from './context/AuthProvider'
import Dashboard from './components/dashboard'
import Home from './pages/home'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<ProtectedLayout children={<Dashboard />} />} />

          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

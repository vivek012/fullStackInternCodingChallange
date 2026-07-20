
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import UserDashboard from './pages/UserDashboard'
import OwnerDashboard from './pages/OwnerDashboard'
import UserDetails from './pages/UserDetails'


function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/admin" element={<AdminDashboard />} />

      <Route path="/user" element={<UserDashboard />} />

      <Route path="/owner" element={<OwnerDashboard />} />
      <Route
        path="/admin/users/:id"
        element={<UserDetails />}
      />
    </Routes>
  )
}

export default App

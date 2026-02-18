import { ToastContainer } from 'react-bootstrap'
import './App.scss'
import AppRoutes from './router/Router'
import { AuthProvider } from './auth/AuthProvide'

function App() {
   
  return (
    <>
     <AuthProvider>
        <ToastContainer position="top-end"  />
    <AppRoutes />
  </AuthProvider>
    </>
  )
}

export default App

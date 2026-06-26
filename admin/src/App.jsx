import { Route, Routes } from 'react-router-dom'
import List from './components/List'
import Sidebar from './components/Sidebar'
import AdminLogin from './components/AdminLogin'
import Add from './components/Add'
import Order from './components/Order'

import ProtectedRoute from './components/ProductRoute'
import User from './components/User'

const App = () => {
  return (
    <>
    <Sidebar />
    <Routes>
    <Route path='/admin/login'element={<AdminLogin/>}/>
    <Route path='/admin/add'element={<ProtectedRoute>
              <Add />
            </ProtectedRoute>}/>
    <Route path='/admin/list'element={<ProtectedRoute>
              <List />
            </ProtectedRoute>}/>
    <Route path='/admin/orders'element={<ProtectedRoute>
              <Order />
            </ProtectedRoute>}/>
    <Route path='/admin/users'element={<ProtectedRoute>
              <User />
            </ProtectedRoute>}/>

</Routes>
    </>


  

)
}

export default App
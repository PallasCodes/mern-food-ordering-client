import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './layouts/layout'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout>HomePage </Layout>} />
      <Route path="/profile" element={<span>User profile page</span>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes

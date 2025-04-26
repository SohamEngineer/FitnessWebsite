import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import AdminPanal from './AdminPanal'
import AddHome from './AddHome'
import AddGym from './AddGym'
import AdminDashbord from './AdminDashbord'


function AdminRouter() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPanal />}>
        {/* Default route inside AdminPanal */}
        <Route index element={<AdminDashbord />} />
        <Route path="addHomeWorkout" element={<AddHome />} />
        <Route path="addGymWorkout" element={<AddGym />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/admin" />} />
    </Routes>
  )
}

export default AdminRouter

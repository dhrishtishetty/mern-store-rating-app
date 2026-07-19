import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import StoreList from "./pages/StoreList.jsx";
import OwnerDashboard from "./pages/OwnerDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Users from "./pages/Users.jsx";
import Stores from "./pages/Stores.jsx";
import CreateUser from "./pages/CreateUser";
import CreateStore from "./pages/CreateStore";
import Layout from "./layouts/Layout.jsx";

export default function App(){
  return(
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/admin" element={
        <ProtectedRoute role="ADMIN">
          <Layout>
            <AdminDashboard/>
          </Layout>
        </ProtectedRoute>
      }/>

      <Route path="/stores" element={
        <ProtectedRoute role="USER">
          <Layout>
            <StoreList/>
          </Layout>
        </ProtectedRoute>
      }/>

      <Route path="/owner" element={
        <ProtectedRoute role="OWNER">
          <Layout>
            <OwnerDashboard/>
          </Layout>
        </ProtectedRoute>
      }/>

      <Route path="/admin/users" element={
        <ProtectedRoute role="ADMIN">
          <Layout>
            <Users/>
          </Layout>
        </ProtectedRoute>
      }/>

      <Route path="/admin/stores" element={
        <ProtectedRoute role="ADMIN">
          <Layout>
            <Stores/>
          </Layout>
        </ProtectedRoute>
      }/>

      <Route path="/admin/create-user" element={
        <ProtectedRoute role="ADMIN">
          <Layout>
            <CreateUser/>
          </Layout>
        </ProtectedRoute>
      }/>

      <Route path="/admin/create-store" element={
        <ProtectedRoute role="ADMIN">
          <Layout>
            <CreateStore/>
          </Layout>
        </ProtectedRoute>
      }/>
    </Routes>
  )
}
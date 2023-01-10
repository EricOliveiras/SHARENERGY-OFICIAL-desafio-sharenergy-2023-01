import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "../pages/Login"
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import HttpCat from "../pages/httpCat"
import PrivateRoute from "./PrivateRoute"
import RandomDog from "../pages/randomDog"
import ClientPage from "../pages/ClientPage"
import ClientRegisterPage from "../pages/ClientRegisterPage"
import ClientSearch from "../pages/ClientSearch"
import ClientUpdatePage from "../pages/ClientUpdate"

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />}/>
          <Route exact path="/register" element={<Register />}/>
          
          <Route exact path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }/>
          <Route exact path="/http-cat" element={
            <PrivateRoute>
              <HttpCat />
            </PrivateRoute>
          }/>
          <Route exact path="/random-dog" element={
            <PrivateRoute>
              <RandomDog />
            </PrivateRoute>
          }/>
          <Route exact path="/client" element={
            <PrivateRoute>
              <ClientPage />
            </PrivateRoute>
          }/>
          <Route exact path="/client-register" element={
            <PrivateRoute>
              <ClientRegisterPage />
            </PrivateRoute>
          }/>
          <Route exact path="/client-search" element={
            <PrivateRoute>
              <ClientSearch />
            </PrivateRoute>
          }/>
          <Route exact path="/client/update/:id" element={
            <PrivateRoute>
              <ClientUpdatePage />
            </PrivateRoute>
          }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRoutes
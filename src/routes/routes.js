import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import paths from '../constants/paths'
import { Home, Login, Products, Register, Cart, Admin } from '../containers'
import PrivateRoute from './private-route'

function MyRoutes() {
    return (
        <Router>
            <Routes>
                <Route path={paths.Login} element={<Login />} />
                <Route path={paths.Register} element={<Register />} />
                <Route path={paths.Home} element={<PrivateRoute />}>
                    <Route path={paths.Home} element={<Home />} />
                    <Route path={paths.Products} element={<Products />} />
                    <Route path={paths.Cart} element={<Cart />} />
                </Route>
                <Route path={paths.Home} element={<PrivateRoute isAdmin />}>
                    <Route path={paths.Order} element={<Admin />} />
                    <Route path={paths.ProductsList} element={<Admin />} />
                    <Route path={paths.NewProduct} element={<Admin />} />
                    <Route path={paths.EditProduct} element={<Admin />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default MyRoutes

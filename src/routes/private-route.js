import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

import PropTypes from 'prop-types'

import { Header } from '../components'
import paths from '../constants/paths'

function PrivateRoute({ element, isAdmin, ...rest }) {
    const user = localStorage.getItem('codeburger:userData')

    if (!user) {
        return <Navigate to={paths.Login} />
    }

    if (isAdmin && !JSON.parse(user).admin) {
        return <Navigate to={paths.Home} />
    }

    return (
        <>
            {!isAdmin && <Header />}
            <Outlet {...rest} element={element} />
        </>
    )
}

export default PrivateRoute

PrivateRoute.propTypes = {
    element: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    isAdmin: PropTypes.bool
}

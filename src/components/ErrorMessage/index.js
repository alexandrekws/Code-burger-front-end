import React from 'react'

import Proptypes from 'prop-types'

import { ErrorMessageStyles } from './styles'

export function ErrorMessage({ children }) {
    return <ErrorMessageStyles>{children}</ErrorMessageStyles>
}

ErrorMessage.propTypes = {
    children: Proptypes.string
}

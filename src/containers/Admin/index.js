import React from 'react'
import { useLocation } from 'react-router-dom'

import { SideMenuAdmin } from '../../components'
import paths from '../../constants/paths'
import EditProduct from './EditProduct'
import ListProducts from './ListProducts'
import NewProduct from './NewProduct'
import Orders from './Orders'
import { Container, ContainerItens } from './styles'

export function Admin() {
    const { pathname } = useLocation()

    return (
        <Container>
            <SideMenuAdmin path={pathname} />
            <ContainerItens>
                {pathname === paths.Order && <Orders />}
                {pathname === paths.ProductsList && <ListProducts />}
                {pathname === paths.NewProduct && <NewProduct />}
                {pathname === paths.EditProduct && <EditProduct />}
            </ContainerItens>
        </Container>
    )
}

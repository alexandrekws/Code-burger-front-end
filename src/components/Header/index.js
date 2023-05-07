import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import CartIcon from '../../assets/cart-icon.png'
import Usericon from '../../assets/user-icon.png'
import paths from '../../constants/paths'
import { useUser } from '../../hooks/UserContext'
import {
    Container,
    ContainerLeft,
    PageLink,
    ContainerRight,
    ContainerText,
    Line,
    PageLinkExit
} from './styles'

export function Header() {
    const { logout, userData } = useUser()
    const navigate = useNavigate()
    const location = useLocation()

    const logoutUser = () => {
        logout()
        navigate(paths.Login)
    }

    return (
        <Container>
            <ContainerLeft>
                <PageLink
                    onClick={() => navigate(paths.Home)}
                    isActive={location.pathname === '/'}
                >
                    Home
                </PageLink>
                <PageLink
                    onClick={() => navigate(paths.Products)}
                    isActive={location.pathname.includes('produtos')}
                >
                    Ver Produtos
                </PageLink>
            </ContainerLeft>

            <ContainerRight>
                <PageLink onClick={() => navigate(paths.Cart)}>
                    <img src={CartIcon} alt="Icone do Carrinho" />
                </PageLink>
                <Line></Line>
                <PageLink>
                    <img src={Usericon} alt="Icone do Usuário" />
                </PageLink>

                <ContainerText>
                    <p>Olá, {userData.name}</p>
                    <PageLinkExit onClick={logoutUser}>Sair</PageLinkExit>
                </ContainerText>
            </ContainerRight>
        </Container>
    )
}

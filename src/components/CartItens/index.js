import React from 'react'

import DeleteIcon from '@mui/icons-material/Delete'

import { useCart } from '../../hooks/CartContext'
import formatCurrency from '../../utils/formatCurrency'
import { Container, Header, Body, EmptyCart, ButtonDelete } from './styles'

export function CartItens() {
    const { cartProducts, increasePorducts, dencreasePorducts, deleteProduct } =
        useCart()
    return (
        <Container>
            <Header>
                <p></p>
                <p>Itens</p>
                <p>Preço</p>
                <p style={{ paddingRight: 30 }}>Quantidade</p>
                <p>Total</p>
            </Header>

            {cartProducts && cartProducts.length > 0 ? (
                cartProducts.map(product => (
                    <Body key={product.id}>
                        <img src={product.url} alt="Imagem do Produto" />
                        <p>{product.name}</p>
                        <p>{formatCurrency(product.price)}</p>
                        <div className="quantity-container">
                            <button
                                onClick={() => dencreasePorducts(product.id)}
                            >
                                -
                            </button>
                            <p>{product.quantity}</p>
                            <button
                                onClick={() => increasePorducts(product.id)}
                            >
                                +
                            </button>
                        </div>
                        <p>
                            {formatCurrency(product.quantity * product.price)}
                        </p>
                        <ButtonDelete onClick={() => deleteProduct(product.id)}>
                            <DeleteIcon />
                        </ButtonDelete>
                    </Body>
                ))
            ) : (
                <EmptyCart>Carrinho Vazio</EmptyCart>
            )}
        </Container>
    )
}

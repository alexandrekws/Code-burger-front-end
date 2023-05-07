import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import paths from '../../constants/paths'
import { useCart } from '../../hooks/CartContext'
import apiCodeBurger from '../../services/api'
import formatCurrency from '../../utils/formatCurrency'
import { Button } from '../Button'
import { Container } from './styles'

export function CartResume() {
    const [finalItemsPrice, setFinalItemsPrice] = useState(0)
    const [deliveryTax] = useState(5)
    const navigate = useNavigate()

    const { cartProducts } = useCart()

    useEffect(() => {
        const sumAllItems = cartProducts.reduce((acc, current) => {
            return current.price * current.quantity + acc
        }, 0)

        setFinalItemsPrice(sumAllItems)
    }, [cartProducts])

    const clearCartData = async () => {
        await localStorage.removeItem('codeburger:cartInfo')
        cartProducts.length = 0
    }

    const ReturnPageProducts = () => {
        navigate(paths.Products)
    }

    const submitOrder = async () => {
        const order = cartProducts.map(product => {
            return { id: product.id, quantity: product.quantity }
        })

        await toast.promise(apiCodeBurger.post('orders', { products: order }), {
            pending: 'Realizando o seu Pedido...',
            success: 'Pedido realizado com sucesso',
            error: 'Falha ao tentar realizar o pedido, tente novamente'
        })

        setTimeout(() => {
            navigate(paths.Products)
            clearCartData()
        }, 1000)
    }

    return (
        <div>
            <Container>
                <div className="container-top">
                    <h2 className="title">Resumo do Pedido</h2>
                    <p className="items">Itens</p>
                    <p className="items-price">
                        {formatCurrency(finalItemsPrice)}
                    </p>
                    <p className="delivery-tax">Taxa de Entrega</p>
                    <p className="delivery-tax-price">
                        {formatCurrency(deliveryTax)}
                    </p>
                </div>
                <div className="container-botton">
                    <p>Total</p>
                    <p>{formatCurrency(finalItemsPrice + deliveryTax)}</p>
                </div>
            </Container>
            <Button
                style={{ width: '100%', marginTop: 30 }}
                onClick={ReturnPageProducts}
            >
                Continuar Comprando
            </Button>
            <Button
                style={{ width: '100%', marginTop: 15 }}
                onClick={submitOrder}
            >
                Finalizar Pedido
            </Button>
        </div>
    )
}

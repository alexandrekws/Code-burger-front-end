import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import PropTypes from 'prop-types'

import ProductsLogo from '../../assets/products-logo.svg'
import { CardProduct } from '../../components'
import apiCodeBurger from '../../services/api'
import formatCurrency from '../../utils/formatCurrency'
import {
    Container,
    ProductsImg,
    CategoryButton,
    CategoriesMenu,
    ProductsContainer
} from './styles'

export function Products() {
    const { state } = useLocation()
    let categoryId = 0
    if (state?.categoryId) {
        categoryId = state.categoryId
    }
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [activeCategory, setActiveCategory] = useState(categoryId)

    useEffect(() => {
        async function loadCategory() {
            const { data } = await apiCodeBurger.get('categories')

            const newCategories = [{ id: 0, name: 'Todas' }, ...data]

            setCategories(newCategories)
        }

        async function loadProducts() {
            const { data: allProducts } = await apiCodeBurger.get('products')

            const newProducts = allProducts.map(product => {
                return {
                    ...product,
                    formatedPrice: formatCurrency(product.price)
                }
            })

            setProducts(newProducts)
        }

        loadProducts()
        loadCategory()
    }, [])

    useEffect(() => {
        if (activeCategory === 0) {
            setFilteredProducts(products)
        } else {
            const newFilteredProducts = products.filter(
                product => product.category_id === activeCategory
            )

            setFilteredProducts(newFilteredProducts)
        }
    }, [activeCategory, products])

    return (
        <Container>
            <ProductsImg src={ProductsLogo} alt="Logo de Produtos" />
            <CategoriesMenu>
                {categories &&
                    categories.map(category => (
                        <CategoryButton
                            type="button"
                            key={category.id}
                            isActiveCategory={activeCategory === category.id}
                            onClick={() => {
                                setActiveCategory(category.id)
                            }}
                        >
                            {category.name}
                        </CategoryButton>
                    ))}
            </CategoriesMenu>
            <ProductsContainer>
                {filteredProducts &&
                    filteredProducts.map(product => (
                        <CardProduct key={product.id} product={product} />
                    ))}
            </ProductsContainer>
        </Container>
    )
}

Products.propTypes = {
    location: PropTypes.object
}

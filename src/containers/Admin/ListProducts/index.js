import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import paths from '../../../constants/paths'
import apiCodeBurger from '../../../services/api'
import formatCurrency from '../../../utils/formatCurrency'
import { Container, Img, EditIconStyles } from './styles'

function ListProducts() {
    const [products, setProducts] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        async function listProducts() {
            const { data } = await apiCodeBurger.get('products')

            setProducts(data)
        }

        listProducts()
    }, [])

    function isOffer(offerStatus) {
        if (offerStatus) {
            return <CheckCircleIcon style={{ color: '#228B22' }} />
        }
        return <CancelIcon style={{ color: '#CC1717' }} />
    }

    function editProduct(product) {
        navigate(paths.EditProduct, { state: { product } })
    }

    return (
        <Container>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Preço</TableCell>
                            <TableCell align="center">
                                Produto em Oferta
                            </TableCell>
                            <TableCell align="center">
                                Imagem do Produto
                            </TableCell>
                            <TableCell align="center">Editar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products &&
                            products.map(product => (
                                <TableRow
                                    key={product.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0
                                        }
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {product.name}
                                    </TableCell>
                                    <TableCell>
                                        {formatCurrency(product.price)}
                                    </TableCell>
                                    <TableCell align="center">
                                        {isOffer(product.offer)}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Img
                                            src={product.url}
                                            alt="Imagem-Produto"
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <EditIconStyles
                                            onClick={() => editProduct(product)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default ListProducts

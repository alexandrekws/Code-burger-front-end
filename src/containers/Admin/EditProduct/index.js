import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import ReactSelect from 'react-select'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import * as Yup from 'yup'

import { ErrorMessage } from '../../../components'
import paths from '../../../constants/paths'
import apiCodeBurger from '../../../services/api'
import {
    Container,
    Label,
    Input,
    ButtonStyles,
    LabelUpload,
    ContainerInput
} from './styles'

function EditProduct() {
    const [fileName, setFileName] = useState(null)
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()
    const {
        state: { product }
    } = useLocation()

    const schema = Yup.object().shape({
        name: Yup.string().required('Digite o nome do produto'),
        price: Yup.string().required('Digite o preço do produto'),
        category: Yup.object().required('Selecione uma categoria'),
        offer: Yup.bool()
    })

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = async data => {
        const productDataFormData = new FormData()

        productDataFormData.append('name', data.name)
        productDataFormData.append('price', data.price)
        productDataFormData.append('category_id', data.category.id)
        productDataFormData.append('file', data.file[0])
        productDataFormData.append('offer', data.offer)

        await toast.promise(
            apiCodeBurger.put(`products/${product.id}`, productDataFormData),
            {
                pending: 'Editando novo produto...',
                success: 'Produto editado com sucesso',
                error: 'Falha ao editar o produto'
            }
        )

        setTimeout(() => {
            navigate(paths.ProductsList)
        }, 2000)
    }

    useEffect(() => {
        async function loadCategories() {
            const { data } = await apiCodeBurger.get('categories')

            setCategories(data)
        }

        loadCategories()
    }, [])

    return (
        <Container>
            <h1>Editar produto</h1>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Label>Nome</Label>
                    <Input
                        type="text"
                        {...register('name')}
                        defaultValue={product.name}
                    />
                    <ErrorMessage>{errors.name?.message}</ErrorMessage>
                </div>

                <div>
                    <Label>Preço</Label>
                    <Input
                        type="number"
                        {...register('price')}
                        defaultValue={product.price}
                    />
                    <ErrorMessage>{errors.price?.message}</ErrorMessage>
                </div>

                <div>
                    <LabelUpload>
                        {fileName || (
                            <>
                                <FileUploadIcon />
                                Carregue a imagem do produto
                            </>
                        )}

                        <input
                            type="file"
                            id="imagem-input"
                            accept="image/png, image/jpeg"
                            {...register('file')}
                            onChange={value => {
                                setFileName(value.target.files[0]?.name)
                            }}
                        />
                    </LabelUpload>
                    <ErrorMessage>{errors.file?.message}</ErrorMessage>
                </div>

                <div>
                    <Controller
                        name="category"
                        control={control}
                        defaultValue={product.category}
                        render={({ field }) => {
                            return (
                                <ReactSelect
                                    {...field}
                                    options={categories}
                                    getOptionLabel={cat => cat.name}
                                    getOptionValue={cat => cat.id}
                                    placeholder="Categorias"
                                    defaultValue={product.category}
                                />
                            )
                        }}
                    ></Controller>
                    <ErrorMessage>{errors.category?.message}</ErrorMessage>
                </div>

                <ContainerInput>
                    <input
                        type="checkbox"
                        {...register('offer')}
                        defaultChecked={product.offer}
                    />
                    <Label>Produto em Oferta ?</Label>
                </ContainerInput>

                <ButtonStyles>Editar Produto</ButtonStyles>
            </form>
        </Container>
    )
}

export default EditProduct

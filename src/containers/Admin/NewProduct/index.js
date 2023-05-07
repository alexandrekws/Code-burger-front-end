import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import ReactSelect from 'react-select'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import * as Yup from 'yup'

import { ErrorMessage } from '../../../components'
import paths from '../../../constants/paths'
import apiCodeBurger from '../../../services/api'
import { Container, Label, Input, ButtonStyles, LabelUpload } from './styles'

function NewProduct() {
    const [fileName, setFileName] = useState(null)
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    const schema = Yup.object().shape({
        name: Yup.string().required('Digite o nome do produto'),
        price: Yup.string().required('Digite o preço do produto'),
        category: Yup.object().required('Selecione uma categoria'),
        file: Yup.mixed()
            .test('required', 'Selecione uma imagem', value => {
                return value?.length > 0
            })
            .test('fileSize', 'Carregue arquivos de até 2mb', value => {
                return value[0]?.size <= 2097152
            })
            .test('type', 'Carregue apenas arquivos PNG ou JPEG', value => {
                return (
                    value[0]?.type === 'image/jpeg' ||
                    value[0]?.type === 'image/png'
                )
            })
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

        await toast.promise(
            apiCodeBurger.post('products', productDataFormData),
            {
                pending: 'Cadastrando novo produto...',
                success: 'Produto cadastrado com sucesso',
                error: 'Falha ao cadastrar o produto'
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
            <h1>Cadastrar novo produto</h1>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Label>Nome</Label>
                    <Input type="text" {...register('name')} />
                    <ErrorMessage>{errors.name?.message}</ErrorMessage>
                </div>

                <div>
                    <Label>Preço</Label>
                    <Input type="number" {...register('price')} />
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
                        render={({ field }) => {
                            return (
                                <ReactSelect
                                    {...field}
                                    options={categories}
                                    getOptionLabel={cat => cat.name}
                                    getOptionValue={cat => cat.id}
                                    placeholder="Categorias"
                                />
                            )
                        }}
                    ></Controller>
                    <ErrorMessage>{errors.category?.message}</ErrorMessage>
                </div>

                <ButtonStyles>Adicionar Produto</ButtonStyles>
            </form>
        </Container>
    )
}

export default NewProduct

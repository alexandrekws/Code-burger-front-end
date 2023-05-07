import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import RegisterImg from '../../assets/cadastro-image.svg'
import LogoImg from '../../assets/logo-image.svg'
import { Button, ErrorMessage } from '../../components'
import paths from '../../constants/paths'
import apiCodeBurger from '../../services/api'
import {
    Container,
    RegisterImage,
    ContainerItens,
    Label,
    Input,
    SignInLink
} from './styles'

export function Register() {
    const navigate = useNavigate()
    const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string()
            .email('Digite um e-mail válido')
            .required('O e-mail é obrigatório'),
        password: Yup.string()
            .required('A senha é obrigatória')
            .min(6, 'A senha deve ter pelo menos 6 digítos'),
        confirmPassword: Yup.string()
            .required('A senha é obrigatória')
            .oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
    })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = async clientData => {
        try {
            const { status } = await apiCodeBurger.post(
                'users',
                {
                    name: clientData.name,
                    email: clientData.email,
                    password: clientData.password
                },
                { validateStatus: () => true }
            )

            if (status === 201 || status === 200) {
                toast.success('Cadastro criado com sucesso')
                setTimeout(() => {
                    navigate(paths.Login)
                }, 1000)
            } else if (status === 409) {
                toast.error('E-mail já cadastrado! Faça login para continuar')
            } else {
                throw new Error()
            }
        } catch (err) {
            toast.error('Falha no sistema! Tente novamente')
        }
    }

    return (
        <Container>
            <RegisterImage src={RegisterImg} alt="register-image" />
            <ContainerItens>
                <img src={LogoImg} alt="Logo-code-burger" />
                <h1>Cadastre-se</h1>

                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Label error={errors.name?.message}>Nome</Label>
                    <Input
                        type="text"
                        {...register('name')}
                        error={errors.name?.message}
                    />
                    <ErrorMessage>{errors.name?.message}</ErrorMessage>

                    <Label error={errors.email?.message}>Email</Label>
                    <Input
                        type="email"
                        {...register('email')}
                        error={errors.email?.message}
                    />
                    <ErrorMessage>{errors.email?.message}</ErrorMessage>

                    <Label error={errors.password?.message}>Senha</Label>
                    <Input
                        type="password"
                        {...register('password')}
                        error={errors.password?.message}
                    />
                    <ErrorMessage>{errors.password?.message}</ErrorMessage>

                    <Label error={errors.confirmPassword?.message}>
                        Confirmar Senha
                    </Label>
                    <Input
                        type="password"
                        {...register('confirmPassword')}
                        error={errors.confirmPassword?.message}
                    />
                    <ErrorMessage>
                        {errors.confirmPassword?.message}
                    </ErrorMessage>

                    <Button
                        type="submit"
                        style={{ marginTop: 25, marginBottom: 25 }}
                    >
                        Cadastrar
                    </Button>
                </form>
                <SignInLink>
                    Já possui conta?{' '}
                    <Link style={{ color: 'white' }} to={paths.Login}>
                        Logar
                    </Link>
                </SignInLink>
            </ContainerItens>
        </Container>
    )
}

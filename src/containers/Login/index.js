import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import LoginImg from '../../assets/login-image.svg'
import LogoImg from '../../assets/logo-image.svg'
import { Button, ErrorMessage } from '../../components'
import paths from '../../constants/paths'
import { useUser } from '../../hooks/UserContext'
import apiCodeBurger from '../../services/api'
import {
    Container,
    LoginImage,
    ContainerItens,
    Label,
    Input,
    SignInLink
} from './styles'

export function Login() {
    const navigate = useNavigate()

    const { putUserData } = useUser()

    const schema = Yup.object().shape({
        email: Yup.string()
            .email('Digite um e-mail válido')
            .required('O e-mail é obrigatório'),
        password: Yup.string()
            .required('O senha é obrigatória')
            .min(6, 'A senha deve ter pelo menos 6 digítos')
    })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = async clientData => {
        const { data } = await toast.promise(
            apiCodeBurger.post('sessions', {
                email: clientData.email,
                password: clientData.password
            }),
            {
                pending: 'Verificando seus dados',
                success: 'Logado com sucesso!',
                error: 'Verifique seu e-mail e senhas'
            }
        )

        putUserData(data)

        setTimeout(() => {
            if (data.admin) {
                navigate(paths.Order)
            } else {
                navigate(paths.Home)
            }
        }, 1000)
    }

    return (
        <Container>
            <LoginImage src={LoginImg} alt="Login-image" />
            <ContainerItens>
                <img src={LogoImg} alt="Logo-code-burger" />
                <h1>Login</h1>

                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Label>Email</Label>
                    <Input
                        type="email"
                        {...register('email')}
                        error={errors.email?.message}
                    />
                    <ErrorMessage>{errors.email?.message}</ErrorMessage>

                    <Label>Senha</Label>
                    <Input
                        type="password"
                        {...register('password')}
                        error={errors.password?.message}
                    />
                    <ErrorMessage>{errors.password?.message}</ErrorMessage>

                    <Button
                        type="submit"
                        style={{ marginTop: 75, marginBottom: 25 }}
                    >
                        Entrar
                    </Button>
                </form>
                <SignInLink>
                    Não possui conta?{' '}
                    <Link style={{ color: 'white' }} to={paths.Register}>
                        Cadastre-se
                    </Link>
                </SignInLink>
            </ContainerItens>
        </Container>
    )
}

import { Link } from 'react-router-dom'

import styled from 'styled-components'

export const Container = styled.div`
    background-color: #e5e5e5;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 35px;
    padding: 35px 0;

    .rec.rec-arrow {
        background-color: #9758a6;
        color: #e5e5e5;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        border: none;
    }

    .rec.rec-arrow:hover {
        border: 2px solid #9758a6;
        background-color: #e5e5e5;
        color: #9758a6;
    }

    .rec.rec-arrow:disabled {
        border: none;
        background-color: #bebebf;
        color: #e5e5e5;
    }
`

export const CategoryImg = styled.img``

export const ContainerItems = styled.div`
    display: flex;
    flex-direction: column;
`

export const Image = styled.img`
    width: 200px;
    border-radius: 10px;
`

export const Button = styled(Link)`
    margin-top: 16px;
    background: #9758a6;
    border-radius: 8px;
    border: none;

    height: 50px;

    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 100%;

    text-align: center;
    color: #ffffff;

    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }

    &:active {
        opacity: 0.3;
    }

    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
`

import styled from 'styled-components'

export const Container = styled.div`
    background-color: #ffffff;
    box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.03);
    border-radius: 20px;
    padding: 10px;
    width: max-content;
`

export const Header = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr) 0.3fr;
    padding: 10px;
    border-bottom: 1px solid #b5b5b5;
    grid-gap: 10px 15px;

    p {
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;

        color: #9a9a9d;
    }
`

export const Body = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr) 0.3fr;
    padding: 10px;
    grid-gap: 10px 15px;

    img {
        border-radius: 10px;
        width: 120px;
    }

    p {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        font-weight: bold;
        margin-top: 5px;

        color: #000000;
    }

    .quantity-container {
        display: flex;
        gap: 20px;

        button {
            height: 30px;
            background: transparent;
            border: none;
            font-size: 24px;
            cursor: pointer;
        }

        p {
            margin-top: 5px;
        }
    }
`

export const EmptyCart = styled.p`
    padding: 20px;
    text-align: center;
    font-weight: bold;
`

export const ButtonDelete = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;

    &:hover {
        opacity: 0.8;
    }

    &:active {
        opacity: 0.6;
    }
`

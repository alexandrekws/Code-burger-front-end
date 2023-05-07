import styled from 'styled-components'

export const Container = styled.div`
    background: #e5e5e5;
    min-height: calc(100vh - 72px);
`

export const ProductsImg = styled.img`
    width: 100%;
`

export const CategoriesMenu = styled.div`
    display: flex;
    justify-content: center;
    gap: 50px;
    margin-top: 20px;
`

export const CategoryButton = styled.button`
    cursor: pointer;
    background: none;
    border: none;
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    padding-bottom: 5px;

    color: ${props => (props.isActiveCategory ? '#9758A6' : '#9a9a9d')};
    border-bottom: ${props => props.isActiveCategory && '2px solid #9758A6'};
`
export const ProductsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 40px;
    gap: 20px;
    justify-content: center;
    margin-top: 20px;
`

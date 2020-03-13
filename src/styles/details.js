import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: Arial;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    flex:1;
    background-color: rgb(247,245,250);
    color: rgb(31,54,128);
`

export const Body = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Header = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
`

export const Back = styled.span`
    margin: 25px;
`

export const List = styled.ul`
    list-style-type: none;
    font-size: 1rem;
`

export const Item = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const Label = styled.span`
    flex: 1;
`

export const ItemColumn = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
`

export const Days = styled.span`
    color: #000;
`

export const Hour = styled.span`
    background-color: #FFF;
    margin: 5px;
    padding: 5px;
    border-radius: 10px;
`

export const Footer = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    margin: 30px;
`

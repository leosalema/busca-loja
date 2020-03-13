import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  font-family: Arial;
`

export const Headers = styled.header`
    display:flex;
    flex-flow: column nowrap;
    flex: 1 1 100%;
    justify-content: space-around;
    align-items: center;
    padding: 2em;
`

export const Title = styled.h1`
  font-size: 3em;
  color: #ff6500;
  font-weight: 600;
  text-align: center;
`

export const Subtitle = styled.p`
  padding-top: 0.3em;
  font-size: 1.5em;
  color: #333;
`

export const BoxGray = styled.div`
  background: #f8f6fb;
  color: #0b3c88;
  padding: 24px;
  width: 45%;
  :nth-of-type(2) {
    font-size: 1.4em;
    padding-top: 16px;
  }
`

export const Header = styled.div`
  flex-direction: row;  
  margin: 10px;
`

export const Search = styled.input`
  height: 40px;
  width: 300px;
  border: 1px solid #FFF;
  padding: 5px;
  font-size: 1.2rem;
`

export const Button = styled.button`
  height: 40px;
  width: 100px;
  border-radius: 5px;
  background-color: rgb(31,54,128);
  border-color: rgb(31,54,128);
  color: #FFF;
  margin: 5px;
`

export const Text = styled.span`
  display: flex;
  flex-direction: row;
  width: 400px;
`

export const FormSearch = styled.div`
  display: flex;
  flex-direction: rown;
  align-items: flex-end;
  justify-content: space-between;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
`

export const Select = styled.select`
  height: 40px;
`

export const List = styled.ul`
  list-style-type: none;
  background-color: rgb(247,245,250);
`

export const Item = styled.li`
  display: flex;
  width: 450px;
  height: 40px;
  background-color: rgb(250,250,250);
  margin: 5px;
  align-items: center;
  padding-left: 10px;
  justify-content: space-between;
`

export const Hr = styled.hr`
  border-color:rgb(31,54,128);
  box-sizing:border-box;
  width:100%;  
`

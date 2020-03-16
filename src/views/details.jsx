import React from 'react'
import { Container, Body, Label, Footer, Days, Header, Hour, Item, ItemColumn, List, Image } from '../styles/details'

const Details = props => {
  const { shopBusinessHours, petCareClinicBusinessHours, showerBusinessHours, address, image, name } = props.data
  return (
    <Container>
      <Header>
        <span>{name}</span>
        <Image alt='' src={image} />
      </Header>
      <Body>
        <List>
          <Item>
            <Label>Horários Loja</Label>
            <ItemColumn>
              <Days>Dom e Feriados</Days>
              <Hour>{shopBusinessHours.holiday}</Hour>
            </ItemColumn>
            <ItemColumn>
              <Days>Seg á Sab</Days>
              <Hour>{shopBusinessHours.weekdays}</Hour>
            </ItemColumn>
          </Item>
          <Item>
            <Label>Horários Banho e Tosa</Label>
            <ItemColumn>
              <Days>Dom e Feriados</Days>
              <Hour>{showerBusinessHours.holiday}</Hour>
            </ItemColumn>
            <ItemColumn>
              <Days>Seg á Sab</Days>
              <Hour>{showerBusinessHours.weekdays}</Hour>
            </ItemColumn>
          </Item>
          <Item>
            <Label>Horários Veterinária</Label>
            <ItemColumn>
              <Days>Dom e Feriados</Days>
              <Hour>{petCareClinicBusinessHours.holiday}</Hour>
            </ItemColumn>
            <ItemColumn>
              <Days>Seg á Sab</Days>
              <Hour>{petCareClinicBusinessHours.weekdays}</Hour>
            </ItemColumn>
          </Item>
        </List>
      </Body>
      <Footer>
        <p>{address}</p>
      </Footer>
    </Container>
  )
}

export default Details

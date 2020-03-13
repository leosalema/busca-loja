import React, { useEffect, useState } from 'react'
import {
  Container,
  BoxGray,
  Button,
  Field,
  FormSearch,
  Header,
  Hr,
  Item,
  List,
  Search,
  Select,
  Text,
  Headers,
  Title,
  Subtitle
} from '../styles/main'
import { ContainerGlobal} from '../styles/app'
import Details from './details'
import Stores from '../service/stores'

const Main = () => {
  const INITIAL_VALUE = {
    data: [],
    state: [],
    city: [],
    list: []
  }
  const store = new Stores()
  const [isDetails, setDetails] = useState(false)
  const [values, setValues] = useState(INITIAL_VALUE)
  const [search, setSearch] = useState('')
  const [citySearch, setCitySearch] = useState('')
  const [, setNotValues] = useState(false)

  const changeModal = async () => {
    setDetails(false)
    setSearch('')
    getData()
  }

  const openModal = item => {
    setDetails(true)
    setValues({ ...values, item })
  }

  const handleSearch = event => {
    const search = event.target.value
    setSearch(search)
  }

  const handleCity = event => {
    setCitySearch(event.target.value)
  }

  const searchStore = () => {
    const register = values.data.filter(item => item.name.toLowerCase() === search.toLowerCase())
    if (register[0]) {
      setNotValues(false)
      setValues({ ...values, list: register })
    } else {
      setNotValues(true)
    }
  }

  const searchCity = async event => {
    const stateCity = await values.data.filter(item => item.state === event.target.value)
    const data = await stateCity.reduce(
      (accumulator, actual) => {
        if (!accumulator.city.find(acc => acc === actual.city)) { accumulator.city = [...accumulator.city, actual.city] }
        return accumulator
      }, { city: [] }
    )
    setValues({ ...values, city: data.city })
  }

  const searchCitySelect = async () => {
    const register = await values.data.filter(item => item.city.toLowerCase() === citySearch.toLowerCase())
    setValues({ ...values, list: register })
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      const displayLocationInfo = (position) => {
        const lng = position.coords.longitude
        const lat = position.coords.latitude

        const stores = values.data.filter(item => {
          if (((item.lat + 0.005) >= lat && (item.lat - 0.005) <= lat) || ((item.lng + 0.005) >= lng && (item.lng - 0.005) <= lng)) {
            return item
          }
        })
        setValues({ ...values, list: stores })
      }
      navigator.geolocation.getCurrentPosition(displayLocationInfo)
    }
  }

  const getData = async () => {
    const data = await store.getAll()
    const newData = await data.reduce(
      (accumulator, actual) => {
        if (!accumulator.city.find(acc => acc === actual.city)) { accumulator.city = [...accumulator.city, actual.city] }

        if (!accumulator.state.find(acc => acc === actual.state)) { accumulator.state = [...accumulator.state, actual.state] }

        return accumulator
      },
      { city: [], state: [] }
    )
    setValues({ data: data, state: newData.state, city: newData.city, list: data })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <ContainerGlobal />
      <Container>
        <Headers>
          <Title>Encontre a Cobasi mais próxima de você</Title>
          <Subtitle>
            Aqui você encontra os horários, endereços e disponibilidade de
            produtos nas lojas físicas da rede.
          </Subtitle>
        </Headers>
        <BoxGray>
          <Header>
            <Search type='text' placeholder='Pesquisa a cobasi aqui' value={search} onChange={handleSearch} />
            <Button onClick={searchStore}>Buscar</Button>
          </Header>
          <Text><Hr />ou<Hr /></Text>
          <FormSearch>
            <Field>
              <label htmlFor='uf'>Estado</label>
              <Select id='uf' name='uf' onBlur={event => searchCity(event)}>
                <option>-</option>
                {values.state.map((item, key) => (
                  <option key={key}>{item}</option>
                ))}
              </Select>
            </Field>
            <Field>
              <label htmlFor='city'>Cidade</label>
              <Select id='city' name='city' onChange={handleCity}>
                <option>-</option>
                {values.city.map((item, key) => (
                  <option key={key}>{item}</option>
                ))}
              </Select>
            </Field>
            <Button onClick={searchCitySelect}>Buscar</Button>
            <span>ou</span>
            <Button onClick={getLocation}>Usar localização</Button>
          </FormSearch>
          <List>
            {values.list.map((item, key) => (
              <Item key={key} onClick={() => openModal(item)}>
                Cobasi - {item.name}<span>&#62;</span>
              </Item>
            ))}
          </List>
        </BoxGray>
        <BoxGray>
          {isDetails && <Details handleModal={changeModal} data={values.item} />}
        </BoxGray>
      </Container>
    </div>
  )
}

export default Main

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
import { ContainerGlobal } from '../styles/app'
import Details from './details'
import Paginations from '../components/pagination'
import Stores from '../service/stores'

const Main = () => {
  const INITIAL_VALUE = {
    data: [],
    state: [],
    city: [],
    list: [],
    itensPerPage: 10,
    totalItens: 0,
    currentPage: 1,
    skip: 0,
    limit: 10,
    totalPages: []
  }
  const store = new Stores()
  const [isDetails, setDetails] = useState(false)
  const [values, setValues] = useState(INITIAL_VALUE)
  const [search, setSearch] = useState('')
  const [citySearch, setCitySearch] = useState('')
  const [, setNotValues] = useState(false)

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
      setSearch('')
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
          return null
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
    const totalPages = Math.ceil(data.length / values.itensPerPage)
    
    const list = data.filter((item, index) => index >= values.skip && index < values.limit)
    setValues({ data: data, state: newData.state, city: newData.city, list, totalItens: data.length, totalPages })
  }

  const handlePage = async page => {
    const limit = page * 10
    const skip = limit - 10
    const list = values.data.filter((item, index) => index >= skip && index < limit)
    await setValues({...values, currentPage: page, skip, limit, list})
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
          <Paginations totalPages={values.totalPages} changePage={handlePage} currentPage={values.currentPage}/>
        </BoxGray>
        <BoxGray>
          {isDetails && <Details data={values.item} />}
        </BoxGray>
      </Container>
    </div>
  )
}

export default Main

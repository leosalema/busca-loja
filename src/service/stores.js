import Axios from 'axios'

const BASE_URL = 'https://lojas-api.cobasi.com.br/api/lojas'

class Store {
  async getAll () {
    const data = await Axios.get(BASE_URL)
      .then(response => response.data)
    return data
  }
}

export default Store

import Axios from 'axios'

const BASE_URL = 'https://lojas-api.cobasi.com.br/api/lojas'

class Store {
  async getAll () {
    try {
      const data = await Axios.get(BASE_URL)
        .then(response => response.data)
      return data
    } catch (error) {
      throw error
    }
  }
}

export default Store

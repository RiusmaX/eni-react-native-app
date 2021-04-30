import axios from 'axios'
import Config from 'react-native-config'

const api = axios.create({
  baseURL: Config.GRAPH_API_URL,
  headers: {
    Authorization: `Bearer ${Config.GRAPH_API_TOKEN}`,
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

const fetchGraphData = async () => {
  const body = {
    typeReference: 'REFERENCE_10MN',
    typeAgg: 'SITE',
    idAgg: 'EQIOM_CARRIERES-VANDIERES',
    from: '2021-02-01T00:00:00.000Z',
    to: '2021-02-10T00:00:00.000Z'
  }

  try {
    const response = await api.post('passerelle-data-reference', JSON.stringify(body))
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export {
  fetchGraphData
}

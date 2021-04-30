import axios from 'axios'

const TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlZC1hZG1pbiIsImF1dGgiOiJFTkVSRElHSVRfQURNSU4iLCJleHAiOjI1NjU1MDE1ODZ9.iZHZyMjNLCgA6R3CSwCjN19KAhSfGz5PX6d-hgQrKXH95MxpEP1hgIyMnWDz4LwFUPBdg6hX81fzDNHE5y5WAw'

const api = axios.create({
    baseURL: 'http://preprod-caps-client.enerdigit.fr:54443/api/',
    headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

const fetchGraphData = async () => {
    const body = {
        typeReference : "REFERENCE_10MN",
        typeAgg : "SITE",
        idAgg : "EQIOM_CARRIERES-VANDIERES",
        from : "2021-02-01T00:00:00.000Z",
        to : "2021-02-10T00:00:00.000Z"
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
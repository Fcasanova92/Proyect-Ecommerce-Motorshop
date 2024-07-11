
const getURLBackend = async () => {

    try {

        const response =  await axios.get(`http://localhost:3000/data`)

        console.log(response.data.url)

        return response.data.url
        
    } catch (error) {

            console.log(error)
        
    }

}

export const URL_BACKEND = await getURLBackend()
    
import {useEffect, useState} from 'react'
import {fetchData} from './api'

export const useApi = (endpoint, method, data = null) => {
    const [responseData, setResponseData] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchApiData = async () => {
            try {
                const response = await fetchData(endpoint, method, data)
                setResponseData(response)
            } catch (error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchApiData()
    }, [endpoint, method, data])

    return {responseData, isLoading, error}
}
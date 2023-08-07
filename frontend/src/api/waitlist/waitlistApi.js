// const BASE_URL = "/api/waitlist";
//when deployed change this

const createHeaders = () => ({
  "Content-Type": "application/json",
});

export const fetchData = async (endpoint, method, data=null) => {
    const options = {
        method, headers: createHeaders()
    }

    if (data) {
        options.body = JSON.stringify(data)
    }

    const response = await fetch(endpoint)
    return response.json()
}

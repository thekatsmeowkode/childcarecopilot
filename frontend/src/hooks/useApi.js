const BASE_URL = "https://cccopilot-server.onrender.com/";

const createHeaders = () => ({
  "Content-Type": "application/json",
});

export const fetchData = async (endpoint, method, data = null, queryParams = {}) => {
  try {
    const queryString = new URLSearchParams(queryParams).toString();
    const options = {
      method,
      headers: createHeaders(),
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(BASE_URL + endpoint, options);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

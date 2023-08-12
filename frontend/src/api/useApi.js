// const BASE_URL = "/api/waitlist";

const createHeaders = () => ({
  "Content-Type": "application/json",
});

export const fetchData = async (endpoint, method, data = null) => {
  try {
    const options = {
      method,
      headers: createHeaders(),
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(endpoint, options);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
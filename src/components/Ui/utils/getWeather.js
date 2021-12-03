import axios from "axios";
import axiosRetry from "axios-retry";

const getWeather = async (
  setData,
  setApiKey,
  apiKey,
  baseURL,
  forecast,
  params,
) => {
  axiosRetry(axios, {
    retries: 3,
    retryCondition: (err) => {
      return err.response.status === 429;
    },
  });

  await axios({
    method: "GET",
    url: baseURL,
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      setData(response.data);
      console.log(apiKey);
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 429) {
          setApiKey(process.env.REACT_APP_API_KEY_LEGACY);
          console.err(
            `Failed to call API with status code: ${err.response.status}`
          );
        }
      } else {
        console.log(err);
      }
    });
};

export default getWeather;

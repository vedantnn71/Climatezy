import axios from "axios";
import axiosRetry from "axios-retry";

const getWeather = async (
  setData,
  setApiKey,
  apiKey,
  baseURL,
  setIsLoading,
  forecast
) => {
  let forecastList = [];
  setIsLoading(true);
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
      setIsLoading(false);
      setData(response.data);

      if (forecast === "tommorow" || forecast === "week") {
        const currentTime = new Date().getDate();

        if (forecast === "tommorow" && response.data.list) {
          response.data.list.forEach((forecastItem) => {
            const forecastTime = new Date(forecastItem.dt * 1000).getDate();

            if (
              forecastTime === currentTime ||
              forecastTime === currentTime + 1
            ) {
              forecastList.push(forecastItem);
            }
          });
          setData(forecastList);
        }
        // TODO ->
        // else if (forecast === "week" && response.data.list) {
        //   response.data.list.forEach((forecastItem) => {
        //     const forecastTime = new Date(forecastItem.dt);
        //     // forecastList.forEach((item) => {
        //     //   if (forecastTime !== currentTime) {
        //     //     forecastList.push(forecastItem);
        //     //   }
        //     // });
        //     forecastList.push(forecastItem);
        //   });
        // }
      }

      // console.log(forecastList);
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

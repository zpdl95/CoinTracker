const BASE_URL = `https://api.coinpaprika.com/v1`;

export const getCoins = () => {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
};

export const getCoinInfo = (coinId) => {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
};

export const getCoinTickers = (coinId) => {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
};

export const getCoinHistory = (coinId) => {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 2;
  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((response) => response.json());
};

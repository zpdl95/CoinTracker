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
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
  ).then((response) => response.json());
};

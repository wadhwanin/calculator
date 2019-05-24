import fetch from 'isomorphic-fetch';

const baseRequest = (method) => ({
  method,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

const bodyHeader = (method, body) => Object.assign({}, baseRequest(method), {
  mode: 'cors',
  body: JSON.stringify(body)
});

const makePOST = (url, body) => fetch(url, bodyHeader('POST', body));

const calculateRequest = (url, calculatorInput) => makePOST( url, calculatorInput);

export default calculateRequest;

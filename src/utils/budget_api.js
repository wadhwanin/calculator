import fetch from 'isomorphic-fetch';

const apiHeader = {
  Accept: 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
};

const budgetRequest = () => fetch('http://ap-njgoms13t.oneadr.net:8130/budgets/types/DK', apiHeader);

export default budgetRequest;

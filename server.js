const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors())


const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`Server running on port ${PORT}`)
});

app.get('/stats', (req, res) => {
  axios.get('https://api.coinranking.com/v2/stats', {
    headers: {
      'x-access-token': 'coinrankingebc6b9ddca7c86d44b3e490da4b5bd5fe581920a0139b143'
    }
  })
  .then(response => res.json(response.data))
  .catch(error => console.error(error.config.url));
})

app.get('/coins', (req, res) => {
  const search = req.query.search || '';
  const tag = req.query.tags || '';
  const offset = req.query.offset || 0;
  const orderBy = req.query.orderBy || 'marketCap'; 
  const orderDirection = req.query.orderDirection || 'desc';
  axios.get(`https://api.coinranking.com/v2/coins?limit=10&search=${search}&tags=${tag}&offset=${offset}&orderBy=${orderBy}&orderDirection=${orderDirection}`, {
    headers: {
      'x-access-token': 'coinrankingebc6b9ddca7c86d44b3e490da4b5bd5fe581920a0139b143'
    }
  })
  .then(response => res.json(response.data))
  .catch(error => console.error(error.config.url));
})

app.get('/coins/sort', (req, res) => {
  const sort = req.query.sort || '';
  axios.get(`https://api.coinranking.com/v2/coins?limit=3&orderBy=${sort}`, {
    headers: {
      'x-access-token': 'coinrankingebc6b9ddca7c86d44b3e490da4b5bd5fe581920a0139b143'
    }
  })
  .then(response => res.json(response.data))
  .catch(error => console.error(error.config.url));
})

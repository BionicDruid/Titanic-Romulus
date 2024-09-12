const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json()); 


app.post('/get-data', async (req, res) => {
  try {
    const { url } = req.body;  
    const response = await axios.get(url);
    res.json({ data: response.data });
  } catch (error) {
    res.status(500).json({ error: 'Error al hacer la petición' });
  }
});

app.listen(8080, () => {
  console.log('Servidor ejecutándose en el puerto 8080');
});

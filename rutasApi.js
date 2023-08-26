const axios = require('axios');
const express = require('express');
const router = express.Router();

const usuarios = [
    { id: 1, nombre: 'Usuario 1' },
    { id: 2, nombre: 'Usuario 2' },
    { id: 3, nombre: 'Usuario 3' }
];

let CalculoFinanciero = async () => {
    try {
        const response = await axios.get('https://api.binance.com/api/v3/klines?symbol=BTCBUSD&interval=15m&limit=10');
        return response.data; // Devuelve solo los datos de la respuesta
    } catch (error) {
        console.error('Error en CalculoFinanciero:', error);
        throw error;
    }
};

router.get('/', async (req, res) => {
    try {
        const respuestaCalculo = await CalculoFinanciero();
        res.json(respuestaCalculo);
    } catch (error) {
        res.status(500).json({ error: 'Error en el cálculo financiero' });
    }
});

router.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

module.exports = router;




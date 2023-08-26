const axios = require("axios");
const express = require("express");
const tulind = require("tulind");
const router = express.Router();

let datosFinancieros = {};

let CalculoFinanciero = async () => {
  try {
    await axios({
      method: "GET",
      url: "https://api.binance.com/api/v3/klines?symbol=BTCBUSD&interval=1d&limit=120",
    }).then((res) => {
      let lista = [];
      for (let i in res.data) {
        let datos = res.data[i];
        let close = parseFloat(datos[4]).toFixed(2);
        lista.push(close);
      }
      datosFinancieros["price"] = lista[119];
      datosFinancieros["crypto"] = 'Bitcoin';
      console.log(datosFinancieros);
      tulind.indicators.rsi.indicator([lista], [14], (err, exit) => {
        let ultimo_rsi = parseFloat(exit[0][105]).toFixed(2);
        datosFinancieros["RSI"] = ultimo_rsi;
        if (ultimo_rsi <= 20) {
          console.log("oportunidad de compra");
          datosFinancieros["conclusion"] = 1;
          console.log(ultimo_rsi);
        }
        else{
          console.log("No es momento de comprar");
          datosFinancieros["conclusion"] = 2;
          console.log(ultimo_rsi);
        }
      });
    });
    return datosFinancieros; // Devuelve solo los datos de la respuesta
  } catch (error) {
    console.error("Error en CalculoFinanciero:", error);
    throw error;
  }
};

router.get("/", async (req, res) => {
  try {
    const respuestaCalculo = await CalculoFinanciero();
    res.json(respuestaCalculo);
  } catch (error) {
    res.status(500).json({ error: "Error en el cálculo financiero" });
  }
});


module.exports = router;

const axios = require('axios');
const path = require('path');
const fs = require('fs');
const https = require('https');

// Leitura do certificado
const cert = fs.readFileSync(
  path.resolve(__dirname, `../certs/${process.env.GN_CERT}`)
);

const agent = new https.Agent({
  pfx: cert,
  passphrase: ''
});

// Credenciais da GerenciaNet
const credentials = {
  client_id: process.env.GN_CLIENT_ID,
  client_secret: process.env.GN_SECRET_ID
};

const getToken = async () => {

  try{

    const auth = Buffer.from(`${credentials.client_id}:${credentials.client_secret}`).toString('base64');

    const config = {
      method: 'POST',
      url: `${process.env.GN_ENDPOINT}/oauth/token`,
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      httpsAgent: agent,
      data: JSON.stringify({ grant_type: 'client_credentials' })
    };

    const response = await axios(config);

    return response.data; // Retorna apenas os dados relevantes

  }catch(error){
    console.error('Erro ao obter o token:', error.response?.data || error.message);
    throw new Error('Falha ao obter token de autenticação');
  }

};

const createPixPayment = async (body) => {

    console.log(body);

    try{

        const { access_token: accessToken, token_type: tokenType } = await getToken();

        const response = await axios.post(`${process.env.GN_ENDPOINT}/v2/cob`, body, {
            httpsAgent: agent,
            headers: {
                Authorization: `${tokenType} ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data; // Retorna os dados do pagamento

    }catch(error){
        console.error('Erro ao criar pagamento PIX:', error.response?.data || error.message);
        throw new Error('Falha ao criar pagamento PIX');
    }

};

const consultPixPayment = async (query) => {

    try {

        const { access_token: accessToken, token_type: tokenType } = await getToken();

        const response = await axios.get(`${process.env.GN_ENDPOINT}/v2/cob/${query.txid}`, {
            httpsAgent: agent,
            headers: {
                Authorization: `${tokenType} ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data; // Retorna os dados da consulta

    }catch(error){
        console.error('Erro ao consultar pagamento PIX:', error.response?.data || error.message);
        throw new Error('Falha ao consultar pagamento PIX');
    }

};

module.exports = {
  createPixPayment,
  consultPixPayment
};
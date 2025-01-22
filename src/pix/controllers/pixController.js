const gerencianetService = require('../services/gerencianetService');

const createPixPayment = async (request, reply) => {

  try{

    const body = request.body;
    const paymentData = await gerencianetService.createPixPayment(body);
    reply.status(201).send(paymentData); // Envia a resposta com status 201

  }catch(error){
    request.log.error(error); // Loga o erro para o Fastify
    reply.status(500).send({ error: error.message }); // Envia a resposta com erro
  }

};

const getPixPayment = async (request, reply) => {

  try{

    const query = request.query; // Obtém os parâmetros da query string
    const paymentData = await gerencianetService.consultPixPayment(query); // Aguarda a consulta
    reply.status(200).send(paymentData); // Envia a resposta com status 200

  }catch(error){
    request.log.error(error); // Loga o erro para o Fastify
    reply.status(500).send({ error: error.message }); // Envia a resposta com erro
  }

};

module.exports = { 
  createPixPayment,
  getPixPayment
};

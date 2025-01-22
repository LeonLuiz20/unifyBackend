const pixController = require('../controllers/pixController');

async function pixRoutes(fastify, options) {

  // Rota para criar um pagamento PIX
  fastify.post('/pix', async (request, reply) => {

    try{

      const result = await pixController.createPixPayment(request, reply);
      reply.send(result);

    }catch(error){
      fastify.log.error(error);
      reply.status(500).send({ error: 'Erro ao criar pagamento PIX' });
    }

  });

  // Rota para buscar pagamentos PIX
  fastify.get('/pix', async (request, reply) => {

    try{

      const result = await pixController.getPixPayment(request, reply);
      reply.send(result);

    }catch (error){
      fastify.log.error(error);
      reply.status(500).send({ error: 'Erro ao buscar pagamentos PIX' });
    }

  });

}

module.exports = pixRoutes;
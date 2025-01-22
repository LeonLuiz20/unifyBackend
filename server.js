const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');
const dotenv = require('dotenv');

dotenv.config();

fastify.register(cors, {
    origin: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
});

const paymentRoutes = require('./src/pix/routes/pixRoutes');
fastify.register(paymentRoutes, { prefix: '/' });

const startServer = async () => {

  try{

    await fastify.listen({ port: process.env.PORT, host: '0.0.0.0' });
    fastify.log.info(`Server running on port ${process.env.PORT}.`);

  }catch(error){

    fastify.log.error(error);
    process.exit(1);

  }

};

startServer();
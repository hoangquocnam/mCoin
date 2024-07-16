import Moralis from 'moralis';

import { app, logger } from '@/server';

import { env } from './utils/envConfig';

const startServer = async () => {
  try {
    await Moralis.start({ apiKey: env.MORALIS_API_KEY });
    const server = app.listen(env.PORT, () => {
      const { NODE_ENV, HOST, PORT } = env;
      logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
    });

    const onCloseSignal = () => {
      logger.info('SIGINT or SIGTERM received, shutting down...');
      server.close(() => {
        logger.info('Server closed');
        process.exit();
      });
      setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
    };

    process.on('SIGINT', onCloseSignal);
    process.on('SIGTERM', onCloseSignal);
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

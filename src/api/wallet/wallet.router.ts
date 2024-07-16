import express, { Request, Response, Router } from 'express';

import { walletsService } from '@/services/wallets/wallets.service';
import { handleServiceResponse } from '@/utils/httpHandlers';

const walletRouter: Router = (() => {
  const router = express.Router();

  router.get('/ping', async (_req: Request, res: Response) => {
    const response = await walletsService.ping();
    handleServiceResponse(response, res);
  });

  router.get('/eth/price', async (_req: Request, _res: Response) => {
    const res = await walletsService.eth.price();
    handleServiceResponse(res, _res);
  });

  router.get('/addresses', async (_req: Request, _res: Response) => {
    const res = await walletsService.eth.price();
    handleServiceResponse(res, _res);
  });

  return router;
})();

export { walletRouter };

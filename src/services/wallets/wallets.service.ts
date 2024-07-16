import { StatusCodes } from 'http-status-codes';
import Moralis from 'moralis';

import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';

export const walletsService = {
  ping: async () => {
    try {
      // This is where you would ping the wallets to check if they are online
      return new ServiceResponse(ResponseStatus.Success, 'Wallets are online', null, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error pinging wallets: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  eth: {
    price: async () => {
      try {
        const response = await Moralis.EvmApi.token.getTokenPrice({
          address: '0x7cA4408137eb639570F8E647d9bD7B7E8717514A',
          chain: '0x1',
        });
        return new ServiceResponse(ResponseStatus.Success, 'ETH price retrieved', response, StatusCodes.OK);
      } catch (ex) {
        const errorMessage = `Error getting ETH price: ${(ex as Error).message}`;
        logger.error(errorMessage);
        return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
      }
    },
  },
};

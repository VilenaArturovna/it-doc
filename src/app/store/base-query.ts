import SecureStorageService, { SecureStorageKeys } from '../../shared/services/secure-storage-service';
import { ENV } from '../../shared/config';
import { fetchBaseQuery, retry } from '@reduxjs/toolkit/query';

export const baseQuery = retry(
  fetchBaseQuery({
    baseUrl: ENV.apiUrl,
    prepareHeaders: (headers) => {
      const token = SecureStorageService.getItem(SecureStorageKeys.TOKEN);

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
    credentials: 'same-origin',
  }),
  {
    maxRetries: 0,
  },
);

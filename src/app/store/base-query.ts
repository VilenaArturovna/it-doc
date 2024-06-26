import SecureStorageService, { SecureStorageKeys } from '../../shared/services/secure-storage-service';
import { ENV } from '../../shared/config';
import { fetchBaseQuery, retry } from '@reduxjs/toolkit/query';

const baseUrl = ENV.apiUrl;

export const baseQuery = retry(
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = SecureStorageService.getItem(SecureStorageKeys.TOKEN);

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      if (baseUrl?.includes('ngrok')) {
        headers.set('ngrok-skip-browser-warning', '69420');
      }

      return headers;
    },
    credentials: 'same-origin',
  }),
  {
    maxRetries: 0,
  },
);

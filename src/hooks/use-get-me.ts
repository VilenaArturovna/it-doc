import { useGetMeQuery } from '../app/api';
import { useLayoutEffect, useState } from 'react';
import { SecureStorageKeys } from '../shared/services';
import SecureStorageService from '../shared/services/secure-storage-service';

export const useGetMe = () => {
  const [hasToken, setHasToken] = useState(false);

  useLayoutEffect(() => {
    setHasToken(Boolean(SecureStorageService.getItem(SecureStorageKeys.TOKEN)));
  }, []);

  const { data, isLoading, isError, error } = useGetMeQuery(undefined, {
    skip: !hasToken,
  });

  const isUserAuth = hasToken && !isError;

  return {
    user: data,
    isUserAuth,
    isUserLoading: isLoading,
    isError,
    error,
  };
};

import { useLoginMutation } from '../app/api';
import { LoginViaTgRequestDto } from '../shared/types/api/generated';
import SecureStorageService, { SecureStorageKeys } from '../shared/services/secure-storage-service';

export const useLogin = () => {
  const [mutation, { isLoading, isError, error }] = useLoginMutation();

  const onLogin = async (input: LoginViaTgRequestDto) => {
    try {
      const data = await mutation(input).unwrap();
      SecureStorageService.setItem(SecureStorageKeys.TOKEN, data.token);

      return data;
    } catch (err) {}
  };

  return {
    onLogin,
    isLoginLoading: isLoading,
    isError,
    error,
  };
};

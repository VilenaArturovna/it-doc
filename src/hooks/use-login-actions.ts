import { useLogin } from './use-login';
import { LoginViaTgRequestDto } from '../shared/types/api/generated';
import { RoutePaths } from '../shared/route-paths';
import { useNavigate } from 'react-router-dom';

export const useLoginActions = () => {
  const navigate = useNavigate();
  const { onLogin, isLoginLoading, error } = useLogin();

  const onSubmit = async (user: LoginViaTgRequestDto) => {
    try {
      const data = await onLogin(user);

      data && navigate(RoutePaths.orders);
    } catch (err) {}
  };

  return {
    onSubmit,
    isSubmitting: isLoginLoading,
    error,
  };
};

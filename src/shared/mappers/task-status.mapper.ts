import { TaskStatus } from '../types/api/generated';

export const taskStatusMapper = (status: TaskStatus) => {
  switch (status) {
    case 'COMPLETED':
      return 'Выполнено';
    case 'IN_WORK':
      return 'В работе';
    case 'REGISTERED':
      return 'Зарегистрировано';
    default:
      return 'Зарегистрировано';
  }
};

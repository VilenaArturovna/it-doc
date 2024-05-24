import { Role } from '../types/api/generated';

export const roleMapper = (role: Role) => {
  switch (role) {
    case 'admin':
      return 'Администратор';
    case 'engineer':
      return 'Инженер';
    case 'dispatcher':
      return 'Диспетчер';
    case 'manager':
      return 'Менеджер';
    default:
      return 'Не определено';
  }
};

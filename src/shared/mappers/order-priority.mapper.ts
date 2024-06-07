import { Priority } from '../types/api/generated';

export const orderPriorityMapper = (value: Priority) => {
  switch (value) {
    case 'NORMAL':
      return 'Обычный';
    case 'URGENT':
      return 'Срочный';
    default:
      return value;
  }
};

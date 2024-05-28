import { Unit } from '../types/api/generated';

export const unitMapper = (value: Unit) => {
  switch (value) {
    case 'KG':
      return 'кг';
    case 'PIECE':
      return 'шт';
    case 'SET':
      return 'комплект';
    default:
      return 'неизвестно';
  }
};

import { Section } from '../types/api/generated';

export const sectionMapper = (value: Section) => {
  switch (value) {
    case 'MATERIAL':
      return 'Материал';
    case 'PRODUCT':
      return 'Продукт';
    default:
      return value;
  }
};

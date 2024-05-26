import { OrderStatus } from '../types/api/generated';

export const orderStatusMapper = (status: OrderStatus) => {
  switch (status) {
    case 'REGISTERED':
      return 'Зарегестрирована';
    case 'COMPLETED':
      return 'Завершена';
    case 'APPROVED':
      return 'Одобрена';
    case 'DIAGNOSTIC':
      return 'На диагностике';
    case 'APPROVED_AND_SPARE_PART_IS_ORDERED':
      return 'Одобрена и ожидает поступления ЗИП';
    case 'DIAGNOSED':
      return 'Оборудование продиагностировано';
    case 'IN_DIAGNOSTICS_QUEUE':
      return 'В очереди на диагностику';
    case 'IN_PROGRESS':
      return 'В работе';
    case 'READY':
      return 'Готово к выдаче';
  }
};

import { Section, Unit } from '../../../shared/types/api/generated';
import { Dayjs } from 'dayjs';

export type UpdateWarehouseItemFormType = {
  title: string;
  partNumber?: string;
  compatibleModels?: string;
  packing?: string;
  price: number;
  balance: number;
  expense?: number;
  expenseReserve?: number;
  criticalMargin: number;
  nextDeliveryDate?: Dayjs;
  vendorId: string;
  providerId: string;
};

export type CreateWarehouseItemFormType = UpdateWarehouseItemFormType & {
  unit: Unit;
  section: Section;
};

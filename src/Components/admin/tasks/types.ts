import { Dayjs } from 'dayjs';

export type TaskFormValues = {
  theme: string;
  description: string;
  deadline?: Dayjs;
  price?: number;
  responsibleStaffId?: string;
};

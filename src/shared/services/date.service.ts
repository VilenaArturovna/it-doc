import dayjs from 'dayjs';
import 'dayjs/locale/ru';

export class DateService {
  static ISOString(value: string): string {
    return new Date(value).toISOString();
  }

  static format(value: string): string {
    return dayjs(value, { locale: 'ru' }).format('D MMM YYYY HH:mm');
  }
}

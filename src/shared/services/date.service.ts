import dayjs from 'dayjs';
import 'dayjs/locale/ru';

export class DateService {
  static ISOString(value: string): string {
    return new Date(value).toISOString();
  }

  static format(value: string, onlyDate?: boolean): string {
    const template = onlyDate ? 'D MMMM YYYY' : 'D MMMM YYYY HH:mm';
    return dayjs(value, { locale: 'ru' }).format(template);
  }
}

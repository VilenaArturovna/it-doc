interface IProps {
  hours: number;
  minutes: number;
}

export class DeadlineParseService {
  static toMinutes({ hours, minutes }: IProps): number {
    return Number(hours) * 60 + Number(minutes);
  }

  static toHoursAndMinutes(value: number): IProps {
    const hours = Math.floor(value / 60);
    const minutes = value - hours * 60;
    return { hours, minutes };
  }

  static toHoursAndMinutesString(value: number): string {
    const { hours, minutes } = DeadlineParseService.toHoursAndMinutes(value);

    if (hours && minutes) {
      return `${hours} ч ${minutes} мин`;
    }
    if (!hours && minutes) {
      return `${minutes} мин`;
    }
    if (!minutes && hours) {
      return `${hours} ч`;
    }
    if (!hours && !minutes) {
      return '0 ч';
    }

    return '';
  }
}

export const useGetDateRegister = (DATE: string) => {
  const getDeclension = (
    number: number,
    one: string,
    two: string,
    five: string
  ) => {
    const mod100 = Math.abs(number) % 100;
    const mod10 = mod100 % 10;
    if (mod10 === 1 && mod100 !== 11) {
      return one;
    } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
      return two;
    } else {
      return five;
    }
  };

  const checkDateRegister = () => {
    const currentDate = new Date();
    const dateBorn = new Date(DATE);
    const timeDifference = currentDate.getTime() - dateBorn.getTime();

    const ageInMilliseconds = timeDifference;
    const ageInSeconds = ageInMilliseconds / 1000;
    const ageInMinutes = ageInSeconds / 60;
    const ageInHours = ageInMinutes / 60;
    const ageInDays = ageInHours / 24;

    if (ageInDays < 1) {
      return "Недавно созданный аккаунт";
    } else if (ageInDays < 30) {
      const days = Math.floor(ageInDays);
      const daysText = getDeclension(days, "день", "дня", "дней");
      return `${days} ${daysText} на сервисе`;
    } else {
      const months = Math.floor(ageInDays / 30);
      if (months > 12) {
        const years = Math.floor(months / 12);
        const yearsText = getDeclension(years, "год", "года", "лет");
        return `${years} ${yearsText} на сервисе`;
      }
      const monthsText = getDeclension(months, "месяц", "месяца", "месяцев");
      return `${months} ${monthsText} на сервисе`;
    }
  };

  return {
    checkDateRegister,
  };
};

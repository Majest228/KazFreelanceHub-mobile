export const getFullYear = (date: any) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // месяца
  const day = String(date.getDate()).padStart(2, "0"); // дни
  const hours = String(date.getHours()).padStart(2, "0"); // часы
  const minutes = String(date.getMinutes()).padStart(2, "0"); // минуты
  const seconds = String(date.getSeconds()).padStart(2, "0"); // секунду

  const formattedTime: string = `${year}-${month}-${day}-${hours}:${minutes}:${seconds}`;

  return { formattedTime };
};

export const useGenerateDate = (date: string[]) => {
  const newDate = new Date(
    Number(date[0]),
    parseInt(date[1]) - 1,
    parseInt(date[2]),
    parseInt(date[3].split(":")[0]),
    parseInt(date[3].split(":")[1]),
    parseInt(date[3].split(":")[2])
  );

  return { newDate };
};

export const useDifferenceTime = (date: number) => {
  let days = Math.floor(date / (1000 * 60 * 60 * 24));
  date -= days * (1000 * 60 * 60 * 24);

  let months = 0;
  while (days >= 30) {
    days -= 30;
    months++;
  }

  let years = 0;
  while (months >= 12) {
    months -= 12;
    years++;
  }

  let hours = Math.floor(date / (1000 * 60 * 60));
  date -= hours * (1000 * 60 * 60);

  let minutes = Math.floor(date / (1000 * 60));
  date -= minutes * (1000 * 60);

  let seconds = Math.floor(date / 1000);

  return { years, months, days, hours, minutes, seconds };
};

export const useGetTime = (date: any) => {
  const regDate = new Date(date);
  const currentData = new Date();
  const { formattedTime: regDataFormatted } = getFullYear(regDate);
  const { formattedTime: currentDataFormatted } = getFullYear(currentData);

  const newRegDataFormatted = regDataFormatted.split("-");
  const newCurrentDataFormatted = currentDataFormatted.split("-");

  const { newDate: newDateCurrent } = useGenerateDate(newCurrentDataFormatted);
  const { newDate: newDateReg } = useGenerateDate(newRegDataFormatted);

  let timeDifferenceInMillis = Number(newDateCurrent) - Number(newDateReg);

  const { months, days, minutes, seconds, hours, years } = useDifferenceTime(
    timeDifferenceInMillis
  );

  return {
    months,
    days,
    minutes,
    seconds,
    hours,
    timeDifferenceInMillis,
    years,
  };
};

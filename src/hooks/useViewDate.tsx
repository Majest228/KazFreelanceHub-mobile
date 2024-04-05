import React from "react";
import { Text } from "react-native";
import { useGetDeclension } from "./useGetDeclension";
import { useGetTime } from "./useGetTime";

export const useViewDate = (createdAt: any) => {
  const { years, months, days, hours, minutes, seconds } =
    useGetTime(createdAt);

  if (years) {
    const yearsText = useGetDeclension(years, ["год", "года", "лет"]);
    return <Text>{`${years} ${yearsText} назад`}</Text>;
  } else if (months) {
    const monthText = useGetDeclension(months, ["месяц", "месяца", "месяцев"]);
    return <Text>{`${months} ${monthText} назад`}</Text>;
  } else if (days) {
    const daysText = useGetDeclension(days, ["день", "дня", "дней"]);
    return <Text>{`${days} ${daysText} назад`}</Text>;
  } else if (hours !== 0 || minutes) {
    const hoursText = useGetDeclension(hours, ["час", "часа", "часов"]);
    const minutesText = useGetDeclension(minutes, [
      "минута",
      "минуты",
      "минут",
    ]);
    return (
      <>
        <Text>{hours !== 0 && `${hours} ${hoursText}`}</Text>
        <Text>{hours !== 0 && minutes && ` ${minutes} ${minutesText}`}</Text>
        <Text>{!hours && minutes && `${minutes} ${minutesText}`}</Text>
      </>
    );
  } else {
    return <Text>Только что</Text>;
  }
};

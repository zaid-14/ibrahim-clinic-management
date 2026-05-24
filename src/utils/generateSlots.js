export const generateSlots = () => {

  const slots = [];

  // MORNING
  let morningHour = 10;
  let morningMinute = 0;

  while (
    morningHour < 14
  ) {

    const formatted =
      formatTime(
        morningHour,
        morningMinute
      );

    slots.push(formatted);

    morningMinute += 15;

    if (morningMinute === 60) {

      morningMinute = 0;

      morningHour++;

    }

  }

  // EVENING
  let eveningHour = 18;
  let eveningMinute = 0;

  while (
    eveningHour < 23
  ) {

    const formatted =
      formatTime(
        eveningHour,
        eveningMinute
      );

    slots.push(formatted);

    eveningMinute += 15;

    if (eveningMinute === 60) {

      eveningMinute = 0;

      eveningHour++;

    }

  }

  return slots;

};

// FORMAT TIME
const formatTime = (
  hour,
  minute
) => {

  const suffix =
    hour >= 12
      ? "PM"
      : "AM";

  const formattedHour =
    hour > 12
      ? hour - 12
      : hour;

  const formattedMinute =
    minute
      .toString()
      .padStart(2, "0");

  return `${formattedHour}:${formattedMinute} ${suffix}`;

};
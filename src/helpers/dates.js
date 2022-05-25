const unixTimeToPrettyDate = unixtimeValue => {
  return unixtimeValue
    ? new Date(unixtimeValue * 1000).toLocaleString('uk', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      })
    : '';
};

const unixTimeToLocalDateTime = unixtimeValue => {
  if (unixtimeValue) {
    const date = new Date(unixtimeValue * 1000);
    date.setSeconds(0, 0);
    return date.toISOString().replace('Z', '');
  }
  return '';
};

export { unixTimeToPrettyDate, unixTimeToLocalDateTime };

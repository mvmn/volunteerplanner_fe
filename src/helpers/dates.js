const unixTimeToPrettyDate = unixtimeValue => {
  return new Date(unixtimeValue * 1000).toLocaleString('uk', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  });
};

export { unixTimeToPrettyDate };

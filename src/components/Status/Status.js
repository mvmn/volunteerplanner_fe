import clsx from 'clsx';

import styles from './Status.module.scss';

export const Status = ({ status, text }) => {
  const color = status ? 'green' : 'yellow';
  return <div className={clsx(styles.status, styles[color])}>{text}</div>;
};

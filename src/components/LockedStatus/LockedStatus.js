import clsx from 'clsx';

import dictionary from '../../dictionary';
import styles from './LockedStatus.module.scss';

export const LockedStatus = ({ status }) => {
  const color = status ? 'yellow' : 'green';
  const text = status ? dictionary.locked : dictionary.unlocked;
  return <div className={clsx(styles.status, styles[color])}>{text}</div>;
};

import clsx from 'clsx';

import dictionary from '../../dictionary';
import styles from './LockedStatus.module.scss';

export const LockedStatus = ({ status }) => {
  const color = status ? 'green' : 'yellow';
  const text = status ? dictionary.verified : dictionary.notVerified;
  return <div className={clsx(styles.status, styles[color])}>{text}</div>;
};

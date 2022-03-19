import clsx from 'clsx';

import dictionary from '../../dictionary';
import styles from './Priority.module.scss';

const getPriorityName = num => {
  switch (num) {
    case 0:
      return dictionary.high;
    case 1:
      return dictionary.medium;
    case 2:
      return dictionary.low;
    default:
      return dictionary.medium;
  }
};

const STYLES = {
  0: 'high',
  1: 'medium',
  2: 'low'
};

export const Priority = ({ priority }) => {
  const name = getPriorityName(priority);
  return <div className={clsx(styles.priority, styles[STYLES[priority]])}>{name}</div>;
};

import clsx from 'clsx';

import dictionary from '../../dictionary';
import styles from './Priority.module.scss';

const getPriorityName = priority => {
  switch (priority) {
    case 'CRITICAL':
      return dictionary.critical;
    case 'HIGH':
      return dictionary.high;
    case 'NORMAL':
      return dictionary.medium;
    case 'LOW':
    default:
      return dictionary.low;
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

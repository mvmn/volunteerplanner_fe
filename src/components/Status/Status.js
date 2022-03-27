import clsx from 'clsx';

import { STATUS_NAME } from '../../constants/uiConfig';
import dictionary from '../../dictionary';
import styles from './Status.module.scss';

const UserStatus = ({ status }) => {
  const color = status ? 'green' : 'yellow';
  const text = status ? dictionary.verified : dictionary.notVerified;
  return <div className={clsx(styles.status, styles[color])}>{text}</div>;
};

const TaskStatus = ({ status }) => {
  const color = STATUS_NAME[status];
  console.log(color);
  const text = dictionary[STATUS_NAME[status]];
  return <div className={clsx(styles.status, styles[color])}>{text}</div>;
};

export const Status = ({ status }) => {
  return typeof status === 'boolean' ? (
    <UserStatus status={status} />
  ) : (
    <TaskStatus status={status} />
  );
};

import dictionary from '../../dictionary';
import styles from './Footer.module.scss';

export const Footer = () => (
  <div style={{ zIndex: 1202 }} className={styles.footer}>
    {dictionary.taskManager} &copy; 2022
  </div>
);

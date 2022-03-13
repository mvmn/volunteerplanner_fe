import dictionary from '../../dictionary';
import styles from './Footer.module.scss';

export const Footer = () => (
  <div style={{ zIndex: 1202 }} className={styles.footer}>
    {dictionary.taskMeneger} &copy; 2022
  </div>
);

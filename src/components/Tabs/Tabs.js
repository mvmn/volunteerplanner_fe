import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import { styled } from '@mui/system';

import { TASK_STATUSES } from '../../constants/uiConfig';
import dictionary from '../../dictionary';
import styles from './Tabs.module.scss';

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: #202020;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  background-color: transparent;
  padding: 12px 16px;
  margin: 6px 6px 0 6px;
  border: none;
  display: flex;
  text-transform: uppercase;

  &.${tabUnstyledClasses.selected} {
    border-bottom: 3px solid #1976d2;
    color: #202020;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CustomTabs = styled(TabsUnstyled)`
  min-width: 320px;
  border-radius: 8px;
  display: flex;
`;

export const Tabs = ({ value, handleChange }) => (
  <CustomTabs defaultValue={value} value={value} onChange={handleChange}>
    {Object.keys(TASK_STATUSES).map((item, i) => (
      <Tab classes={{ root: styles.root }} value={i} key={item}>
        {dictionary[item]}
      </Tab>
    ))}
  </CustomTabs>
);

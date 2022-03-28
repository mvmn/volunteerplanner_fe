import { Button, Paper, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setUser } from '../../actions/user';
import { Title } from '../../components/Title';
import { UserInformation } from '../../components/UserInformation';
import dictionary from '../../dictionary';
import styles from './Profile.module.scss';

const DisplayData = () => {
  const user = useSelector(state => state.user);
  return <UserInformation user={user} />;
};

const EditData = props => {
  const {
    phoneNumber,
    setPhoneNumber,
    userName,
    setUserName,
    fullName,
    setFullName,
    email,
    setEmail
  } = props;

  return (
    <Paper className={styles.tableContainer}>
      <div className={styles.editRow}>
        <div className={styles.editTitleRow}>{dictionary.phoneNumber}:</div>
        <TextField
          size='small'
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
        />
      </div>
      <div className={styles.editRow}>
        <div className={styles.editTitleRow}>{dictionary.userName}:</div>
        <TextField size='small' value={userName} onChange={e => setUserName(e.target.value)} />
      </div>
      <div className={styles.editRow}>
        <div className={styles.editTitleRow}>{dictionary.fullName}:</div>
        <TextField size='small' value={fullName} onChange={e => setFullName(e.target.value)} />
      </div>
      <div className={styles.editRow}>
        <div className={styles.editTitleRow}>{dictionary.email}:</div>
        <TextField size='small' value={email} onChange={e => setEmail(e.target.value)} />
      </div>
    </Paper>
  );
};

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  const { phoneNumber, userName, fullName, email } = user;
  const [editedPhoneNumber, setPhoneNumber] = useState(phoneNumber);
  const [editedUserName, setUserName] = useState(userName);
  const [editedFullName, setFullName] = useState(fullName);
  const [editedEmail, setEmail] = useState(email);

  const handleEditClick = () => {
    if (isEditing) {
      dispatch(
        setUser({
          phoneNumber: editedPhoneNumber,
          userName: editedUserName,
          fullName: editedFullName,
          email: editedEmail
        })
      );
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title text={dictionary.profile} />

        <Button variant='outlined' onClick={handleEditClick}>
          {isEditing ? dictionary.save : dictionary.edit}
        </Button>
      </div>

      {isEditing ? (
        <EditData
          phoneNumber={editedPhoneNumber}
          setPhoneNumber={setPhoneNumber}
          userName={editedUserName}
          setNickname={setUserName}
          fullName={editedFullName}
          email={editedEmail}
          setEmail={setEmail}
          setFullName={setFullName}
        />
      ) : (
        <DisplayData />
      )}
    </div>
  );
};

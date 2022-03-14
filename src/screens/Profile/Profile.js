import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setUser } from '../../actions/userActions';
import dictionary from '../../dictionary';
import dictionry from '../../dictionary';
import styles from './Profile.module.scss';

const DisplayData = () => {
  const user = useSelector(state => state.user);
  return (
    <TableContainer className={styles.tableContainer} component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableBody>
          {Object.entries(user).map(([key, value]) => {
            return (
              <TableRow key={key}>
                <TableCell className={styles.rowTitle}>{dictionry[key]}:</TableCell>
                <TableCell>{value}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const EditData = props => {
  const {
    phoneNumber,
    setPhoneNumber,
    nickname,
    setNickname,
    fullname,
    setFullname,
    email,
    setEmail,
    city,
    setCity,
    region,
    setRegion
  } = props;

  return (
    <Paper className={styles.tableContainer}>
      <div className={styles.editRow}>
        <div className={styles.editTitleRow}>{dictionry.phoneNumber}:</div>
        <TextField
          size='small'
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
        />
      </div>
      <div className={styles.editRow}>
        <div className={styles.editTitleRow}>{dictionry.nickname}:</div>
        <TextField size='small' value={nickname} onChange={e => setNickname(e.target.value)} />
      </div>
      <div className={styles.editRow}>
        <div className={styles.editTitleRow}>{dictionry.fullname}:</div>
        <TextField size='small' value={fullname} onChange={e => setFullname(e.target.value)} />
      </div>
      <div className={styles.editRow}>
        <div className={styles.editTitleRow}>{dictionry.email}:</div>
        <TextField size='small' value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className={styles.editRow}>
        <div className={styles.editTitleRow}>{dictionry.city}:</div>
        <TextField size='small' value={city} onChange={e => setCity(e.target.value)} />
      </div>
      <div className={styles.editRow}>
        <div className={styles.editTitleRow}>{dictionry.region}:</div>
        <TextField size='small' value={region} onChange={e => setRegion(e.target.value)} />
      </div>
    </Paper>
  );
};

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  const { phoneNumber, nickname, fullname, email, city, region } = user;
  const [editedPhoneNumber, setPhoneNumber] = useState(phoneNumber);
  const [editedNickname, setNickname] = useState(nickname);
  const [editedFullname, setFullname] = useState(fullname);
  const [editedEmail, setEmail] = useState(email);
  const [editedCity, setCity] = useState(city);
  const [editedRegion, setRegion] = useState(region);

  const handleEditClick = () => {
    if (isEditing) {
      dispatch(
        setUser({
          phoneNumber: editedPhoneNumber,
          nickname: editedNickname,
          fullname: editedFullname,
          email: editedEmail,
          city: editedCity,
          region: editedRegion
        })
      );
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography variant='h4' className={styles.title}>
          {dictionry.profile}
        </Typography>

        <Button variant='outlined' onClick={handleEditClick}>
          {isEditing ? dictionary.save : dictionry.edit}
        </Button>
      </div>

      {isEditing ? (
        <EditData
          phoneNumber={editedPhoneNumber}
          setPhoneNumber={setPhoneNumber}
          nickname={editedNickname}
          setNickname={setNickname}
          fullname={editedFullname}
          mail={editedEmail}
          setEmail={setEmail}
          setFullname={setFullname}
          city={editedCity}
          setCity={setCity}
          region={editedRegion}
          setRegion={setRegion}
        />
      ) : (
        <DisplayData />
      )}
    </div>
  );
};

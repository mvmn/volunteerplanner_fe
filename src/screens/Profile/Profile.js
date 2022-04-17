import { Button } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Title } from '../../components/Title';
import { UserInformation } from '../../components/UserInformation';
import dictionary from '../../dictionary';
import { ProfileEditForm } from './components/ProfileEditForm/ProfileEditForm';
import styles from './Profile.module.scss';

const DisplayData = () => {
  const user = useSelector(state => state.user);
  return <UserInformation user={user} />;
};

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const user = useSelector(state => state.user);
  const { phoneNumber, userName, fullName, email } = user;

  const handleEditClick = () => setIsEditing(true);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title text={dictionary.profile} />
        {!isEditing && (
          <Button variant='outlined' size='large' onClick={handleEditClick}>
            {dictionary.edit}
          </Button>
        )}
      </div>
      {isEditing ? (
        <ProfileEditForm
          initialValues={{ phoneNumber, userName, fullName, email }}
          setIsEditing={setIsEditing}
        />
      ) : (
        <DisplayData />
      )}
    </div>
  );
};

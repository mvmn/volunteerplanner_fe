import { Button, Container, Paper } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateCurrentUser } from '../../actions/user';
import { Title } from '../../components/Title';
import { UserInformation } from '../../components/UserInformation';
import dictionary from '../../dictionary';
import { ProfileEditForm } from './components/ProfileEditForm/ProfileEditForm';

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  const { phoneNumber, displayName, organization } = user;

  const handleEditClick = () => setIsEditing(true);

  const handleProfileSave = values => {
    dispatch(updateCurrentUser({ ...values, role: user.role }));
    setIsEditing(false);
  };

  return (
    <Container maxWidth='md'>
      <Paper sx={{ p: 2 }}>
        <Title text={dictionary.profile} />

        {isEditing ? (
          <ProfileEditForm
            user={{ phoneNumber, displayName, organization }}
            onSave={handleProfileSave}
          />
        ) : (
          <UserInformation user={user} />
        )}

        {!isEditing && (
          <Button variant='outlined' size='large' onClick={handleEditClick}>
            {dictionary.edit}
          </Button>
        )}
      </Paper>
    </Container>
  );
};

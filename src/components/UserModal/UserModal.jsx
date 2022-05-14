import { LoadingButton } from '@mui/lab';
import { Button, DialogActions, DialogContent } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateUser } from '../../actions/users';
import { getUser, lockUser, unlockUser, verifyPhone, verifyUser } from '../../api/users';
import { Modal } from '../../components/Modal';
import { UserInformation } from '../../components/UserInformation';
import dictionary from '../../dictionary';

export const UserModal = ({ isModalVisible, onClose, userId }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [lockStatusChanging, setLockStatusChanging] = useState(false);

  useEffect(() => {
    if (userId) {
      setUser(null);
      getUser(userId).then(data => setUser(data));
    }
  }, [userId]);

  const applyPatch = patch => {
    setUser(current => ({ ...current, ...patch }));
    dispatch(updateUser(patch));
  };

  const handleVerifyUserClick = async () => {
    const { userVerified } = await verifyUser(userId);
    applyPatch({ id: userId, userVerified });
  };

  const handleVerifyPhoneClick = async () => {
    const { phoneNumberVerified } = await verifyPhone(userId);
    applyPatch({ id: userId, phoneNumberVerified });
  };

  const handleLockClick = async () => {
    setLockStatusChanging(true);
    const action = user.locked ? unlockUser : lockUser;
    const { locked } = await action(userId);
    setUser(current => ({ ...current, locked }));
    setLockStatusChanging(false);
    dispatch(updateUser({ id: userId, locked }));
  };

  const shouldVerify = user ? !(user.userVerified && user.phoneNumberVerified) : false;

  return (
    <Modal
      open={isModalVisible}
      onClose={onClose}
      title={`${dictionary.user}: ${user?.displayName}`}
    >
      <DialogContent dividers>
        <UserInformation user={user} />
      </DialogContent>
      {user && (
        <DialogActions>
          {shouldVerify ? (
            <>
              {!user.userVerified && (
                <Button variant='outlined' onClick={handleVerifyUserClick}>
                  {dictionary.verifyUser}
                </Button>
              )}

              {!user.phoneNumberVerified && (
                <Button variant='outlined' onClick={handleVerifyPhoneClick}>
                  {dictionary.verifyPhoneNumber}
                </Button>
              )}
            </>
          ) : (
            <LoadingButton
              variant='outlined'
              loading={lockStatusChanging}
              onClick={handleLockClick}
            >
              {user.locked ? dictionary.unlock : dictionary.lock}
            </LoadingButton>
          )}
        </DialogActions>
      )}
    </Modal>
  );
};

import { showToast } from 'components/Toast';
import { useSelector } from 'react-redux';
import { useUpdateUserMutation } from 'src/redux/users/usersApi';
import { selectUser } from 'src/redux/users/usersSlice';

type FormData = {
  name: string;
  email: string;
  location: string;
  phone: string;
  avatar?: File;
};

export const useSmartUserUpdate = () => {
  const user = useSelector(selectUser);
  const [updateUser, status] = useUpdateUserMutation();

  const update = async (formData: FormData) => {
    const changedFields: Partial<FormData> = {};

    if (formData.name !== user.name) changedFields.name = formData.name;
    if (formData.email !== user.email) changedFields.email = formData.email;
    if (formData.location !== user.location)
      changedFields.location = formData.location;
    if (formData.phone !== user.phone) changedFields.phone = formData.phone;

    const isAvatarChanged = formData.avatar instanceof File;

    if (Object.keys(changedFields).length === 0 && !isAvatarChanged) {
      showToast({
        title: 'Немає змін для оновлення',
        status: 'info',
      });
      return;
    }

    try {
      await updateUser({
        userData: changedFields,
        avatar: isAvatarChanged ? formData.avatar : undefined,
      }).unwrap();

      showToast({
        title: 'Профіль оновлено',
        status: 'success',
      });
    } catch (error) {
      showToast({
        title: 'Помилка при оновленні профілю',
        status: 'error',
      });
    }
  };

  return { updateUserSmart: update, ...status };
};

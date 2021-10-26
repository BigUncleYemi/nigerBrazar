import {useMutation, useQueryClient} from 'react-query';
import {useToast} from 'native-base';

import Services from '../services';
import Utils from '../utils';

export default function useUpdateUserProfile() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData('CURRENT_USER');
  return useMutation(
    async propValue => {
      const res = await Services.updateProfile(propValue, data?.user?._id);
      return res;
    },
    {
      onSuccess: data => {
        let old, userData;
        //console.log(data,'onsuccess');
        queryClient.setQueryData('CURRENT_USER', oldData => {
          old = oldData;
          userData = {...oldData, user: data?.data};
          return userData;
        });
        //console.log(old,'onsuccess',userData);
        Utils.setObjectValue('CURRENT_USER', userData);
        return toast.show({
          title: 'Profile Updated Successfully',
          duration: 500,
        });
      },
      onError: err => {
        console.log('Error', err, err?.response);
        toast.show({
          // title: 'Error',
          title:
            err?.response?.data?.message[data?.user?.profile?.language || 'FR'],

          isClosable: true,
        });
      },
    },
  );
}

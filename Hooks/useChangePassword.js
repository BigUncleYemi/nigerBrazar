import {useMutation, useQueryClient} from 'react-query';
import {useToast} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import Services from '../services';

export default function useChangePassword() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData('CURRENT_USER');
  const navigation = useNavigation();
  return useMutation(
    async propValue => {
      const res = await Services.resetPassword({
        ...propValue,
        id: data?.user?._id,
      });
      return res;
    },
    {
      onSuccess: data => {
        //console.log(data,'onsuccess');
        // queryClient.setQueryData('CURRENT_USER', data?.data);
        // navigation.goBack()
        navigation.navigate('FeedBack', {
          BigText: 'Password Changed',
          SmallText: 'You can now access your account via your new password.',
          BtnText: 'Close',
          BtnActionLink: 'Settings',
        });
      },
      onError: err => {
        toast.show({
          /// title: 'Error',
          title:
            err?.response?.data?.message[data?.user?.profile?.language || 'FR'],
        });
      },
    },
  );
}

import {useMutation, useQueryClient} from 'react-query';
import {useToast} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/routers';

import Services from '../services';

export default function usePostAdvert(reset) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData('CURRENT_USER');
  const navigation = useNavigation();
  return useMutation(
    async propValue => {
      console.log(propValue, 'innnder', data?.user?._id);
      const res = await Services.postAdvert(propValue, data?.user?._id);
      console.log(res, 'hgfds', propValue);
      return res;
    },
    {
      onSuccess: data => {
        //console.log(data,'onsuccess');
        // queryClient.setQueryData('CURRENT_USER', data?.data);
        // navigation.goBack()
        reset();
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              {
                name: 'FeedBack',
                params: {
                  BigText: data?.message[data?.user?.profile?.language || 'FR'],
                  SmallText: 'Your advert will now under go approval by us.',
                  BtnText: 'Close',
                  BtnActionLink: 'Home',
                },
              },
            ],
          }),
        );
      },
      onError: err => {
        console.log(err, 'err  hgfds', err);
        toast.show({
          // title: 'Error',
          title:
            err?.response?.data?.message[data?.user?.profile?.language || 'FR'],
        });
      },
    },
  );
}

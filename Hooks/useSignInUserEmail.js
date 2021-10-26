import {useMutation, useQueryClient} from 'react-query';
import {useToast} from 'native-base';
import {
  useNavigation,
  useRoute,
  useNavigationState,
} from '@react-navigation/native';

import Services from '../services';
import Utils from '../utils';

export default function useSignInUserEmail() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('CURRENT_USER');
  const navigation = useNavigation();
  const route = useRoute();
  const isFirstRouteInParent = useNavigationState(
    state => state.routes[0].key === route.key,
  );
  return useMutation(
    async propValue => {
      const res = await Services.login(propValue);
      return res;
    },
    {
      onSuccess: data => {
        //console.log(data,'onsuccess');
        queryClient.setQueryData('CURRENT_USER', data.data);
        Utils.setObjectValue('CURRENT_USER', data.data);

        if (isFirstRouteInParent) {
          navigation.navigate('Home');
        } else {
          navigation.goBack();
        }
        toast.show({
          title: 'Welcome Back',
          description: data?.message[user?.user?.profile?.language || 'FR'],
          status: 'success',
        });
      },
      onError: err => {
        toast.show({
          // title: 'Error',
          title:
            err?.response?.data?.message[user?.user?.profile?.language || 'FR'],
        });
      },
    },
  );
}

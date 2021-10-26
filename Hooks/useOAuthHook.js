import {useMutation, useQueryClient} from 'react-query';
import {useToast} from 'native-base';
import {
  useNavigation,
  useRoute,
  useNavigationState,
} from '@react-navigation/native';

import Services from '../services';

export function useOAuthFacebook() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('CURRENT_USER');
  const navigation = useNavigation();
  const NavigationState = useNavigationState(state => state.routes);
  return useMutation(
    async propValue => {
      //console.log(propValue);
      const res = await Services.facebook(propValue);
      return res;
    },
    {
      onSuccess: data => {
        queryClient.setQueryData('CURRENT_USER', data?.data);
        if (NavigationState.length > 1) {
          navigation.navigate(
            NavigationState[NavigationState.length - 2]?.name || 'Home',
          );
        } else {
          navigation.navigate('Home');
        }
        toast.show({
          title: 'Welcome',
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

export function useOAuthGoogle() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('CURRENT_USER');
  const navigation = useNavigation();
  const NavigationState = useNavigationState(state => state.routes);
  return useMutation(
    async propValue => {
      //console.log(propValue);
      const res = await Services.google(propValue);
      return res;
    },
    {
      onSuccess: data => {
        queryClient.setQueryData('CURRENT_USER', data?.data);
        if (NavigationState.length > 1) {
          navigation.navigate(
            NavigationState[NavigationState.length - 2]?.name || 'Home',
          );
        } else {
          navigation.navigate('Home');
        }
        toast.show({
          title: 'Welcome',
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

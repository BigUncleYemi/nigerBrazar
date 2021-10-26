/* eslint-disable react-hooks/exhaustive-deps */
import {useToast} from 'native-base';
import {useQuery, useQueryClient} from 'react-query';

import Services from '../services';

export default function useGetCategories() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData('CURRENT_USER');
  return useQuery(
    'Categories',
    async () => {
      const res = await Services.getCategories();
      return res.data;
    },
    {
      onError: err => {
        //console.log('Error', err.response.data.message.EN);
        toast.show({
          // title: 'Error',
          title:
            err?.response?.data?.message[data?.user?.profile?.language || 'FR'],
        });
      },
    },
  );
}

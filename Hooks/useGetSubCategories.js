/* eslint-disable react-hooks/exhaustive-deps */
import {useQuery, useQueryClient} from 'react-query';
import {useToast} from 'native-base';

import Services from '../services';

export default function useGetSubCategories(propValue) {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData('CURRENT_USER');
  const toast = useToast();
  return useQuery(
    `SubCategory${propValue}`,
    async () => {
      const res = await Services.getSubCategories(propValue);
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

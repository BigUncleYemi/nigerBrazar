/* eslint-disable react-hooks/exhaustive-deps */
import {useToast} from 'native-base';
import {useQuery, useQueryClient} from 'react-query';

import Services from '../services';

export function useGetAllAds() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData('CURRENT_USER');
  return useQuery(
    'All_ADS',
    async () => {
      const res = await Services.getAllAds();
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

export function useGetAllUserAds(params, userId) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData('CURRENT_USER');
  const id = data?.user?._id;
  return useQuery(
    `USER_ADS_${id}_${params.status}`,
    async () => {
      const res = await Services.getAllUserAds(params, userId || id);
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

export function useGetAllAdsByCategory(id) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData('CURRENT_USER');
  return useQuery(
    `Category_Ads_${id}`,
    async () => {
      const res = await Services.getAdsByCategory(id);
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

export function useGetAllAdsBySubCategory(id) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData('CURRENT_USER');
  return useQuery(
    `SubCategory_Ads_${id}`,
    async () => {
      const res = await Services.getAdsBySubCategory(id);
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

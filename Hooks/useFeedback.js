/* eslint-disable react-hooks/exhaustive-deps */
import {useToast} from 'native-base';
import {useQuery, useQueryClient, useMutation} from 'react-query';

import Services from '../services';

export function useGetAllUserFeedback(params) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData('CURRENT_USER');
  const id = data?.user?._id;
  return useQuery(
    `USER_FEEDBACKS_${id}`,
    async () => {
      const res = await Services.getAllUserFeedBack(params);
      return res.data;
    },
    {
      onError: err => {
        //console.log('Error', err.response.data.message.EN);
        toast.show({
          /// title: 'Error',
          title:
            err?.response?.data?.message[data?.user?.profile?.language || 'FR'],
        });
      },
    },
  );
}

export function useGetAdvertFeedbacks(params) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData('CURRENT_USER');
  const id = data?.user?._id;
  return useQuery(
    `USER_FEEDBACKS_${id}`,
    async () => {
      const res = await Services.getAllAdFeedBacks(params);
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

export default function usePostFeedBackReply() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData('CURRENT_USER');
  return useMutation(
    async propValue => {
      const res = await Services.postUserFeedbackReply(
        {reply: propValue.reply},
        propValue?.id,
      );
      return res;
    },
    {
      onSuccess: data => {
        //console.log(data,'onsuccess');
        // queryClient.setQueryData('CURRENT_USER', data?.data);
        // navigation.goBack()
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

export function usePostFeedBack() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData('CURRENT_USER');
  return useMutation(
    async propValue => {
      const res = await Services.postUserFeedback(
        {message: propValue.message, user: data?.user?._id},
        propValue?.id,
      );
      return res;
    },
    {
      onSuccess: data => {
        //console.log(data,'onsuccess');
        // queryClient.setQueryData('CURRENT_USER', data?.data);
        // navigation.goBack()
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

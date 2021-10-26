import React, {useEffect} from 'react';
import {useQuery} from 'react-query';
import {CommonActions, useNavigation} from '@react-navigation/native';
import Loader from '../Views/Components/Loader';
import Utils from '../utils';

// eslint-disable-next-line
export default (ChildComponent) => {
  const ComposedComponent = props => {
    const navigation = useNavigation();
    const {data, isLoading} = useQuery('CURRENT_USER', async () => {
      const res = await Utils.getMyObject('CURRENT_USER');
      return res;
    });
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        if (data?.user) {
          return;
        } else {
          navigation.dispatch({
            ...CommonActions.goBack(),
            source: props.route.key,
            target: props.route?.params?.key,
          });
          navigation.push('Auth');
        }
      });
      return unsubscribe;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
    return data?.user && !isLoading ? (
      <ChildComponent {...props} />
    ) : (
      <Loader />
    );
  };

  return ComposedComponent;
};

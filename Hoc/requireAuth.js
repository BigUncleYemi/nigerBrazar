import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {CommonActions, useNavigation} from '@react-navigation/native';

// eslint-disable-next-line
export default (ChildComponent) => {
  const ComposedComponent = props => {
    const navigation = useNavigation();
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        if (!props.auth) {
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
    }, [props.auth]);
    return !props.auth ? null : <ChildComponent {...props} />;
  };

  function mapStateToProps(state) {
    return {
      auth: (state.auth.user && state.auth.user.token) || null,
    };
  }

  return connect(mapStateToProps)(ComposedComponent);
};

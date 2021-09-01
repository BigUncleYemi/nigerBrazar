import React from 'react';

import FirebaseService from '../services/FirebaseService';

export const useGetAdminAllUsers = propValue => {
  const _isMounted = React.useRef(true);
  const [users, setUsers] = React.useState([]);
  const [usersLoader, setUsersLoader] = React.useState(false);
  const [err, setErr] = React.useState('false');
  React.useEffect(() => {
    setUsersLoader(true);
    FirebaseService.adminGetAllUsers()
      .then(querySnapshot => {
        let arr = [];
        querySnapshot.docs.map(doc => {
          arr.push({key: doc.id, id: doc.id, ...doc.data()});
          return arr;
        });
        setUsers(arr.reverse());
        setUsersLoader(false);
      })
      .catch(err => {
        setUsersLoader(false);
        setErr(err.message);
      });
    return () => {
      _isMounted.current = false;
    };
  }, [setUsersLoader, propValue]);

  return {
    users,
    usersLoader,
    err,
  };
};

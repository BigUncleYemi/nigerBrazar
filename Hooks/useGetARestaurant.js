import React from "react";

import FirebaseService from "../services/FirebaseService";

export const useGetARestaurant = (propValue, id) => {
  const _isMounted = React.useRef(true);
  const [documents, setDocuments] = React.useState([]);
  const [loader, setLoader] = React.useState(false);
  const [err, setErr] = React.useState("");
  React.useEffect(() => {
    setLoader(true);
    FirebaseService.getARestaurantRequest(propValue)
      .then((doc) => {
        setDocuments(doc.data());
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        setErr(err.message);
      });
      return () => {
        _isMounted.current = false;
      }
  }, [setLoader, propValue, id]);

  return {
    documents,
    loader,
    err,
  };
};
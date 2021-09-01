import React from "react";

import FirebaseService from "../services/FirebaseService";

export const useGetAdminRestaurantsReviews = (propValue) => {
  const _isMounted = React.useRef(true);
  const [reviews, setReviews] = React.useState([]);
  const [reviewLoader, setReviewLoader] = React.useState(false);
  const [err, setErr] = React.useState("");
  React.useEffect(() => {
    setReviewLoader(true);
    FirebaseService.getAdminRestaurantReviewRequest()
      .then((querySnapshot) => {
        let arr = [];
        querySnapshot.docs.map((doc) =>
          arr.push({ id: doc.id, ...doc.data() })
        );
        setReviews(arr.reverse());
        setReviewLoader(false);
      })
      .catch((err) => {
        setReviewLoader(false);
        setErr(err.message);
      });
      return () => {
        _isMounted.current = false;
      }
  }, [setReviewLoader, propValue]);

  return {
    reviews,
    reviewLoader,
    err,
  };
};
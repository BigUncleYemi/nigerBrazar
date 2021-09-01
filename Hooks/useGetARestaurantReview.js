import React from "react";

import FirebaseService from "../services/FirebaseService";

export const useGetARestaurantReview = (id, propValue) => {
  const _isMounted = React.useRef(true);
  const [reviews, setReviews] = React.useState([]);
  const [reviewLoading, setReviewLoader] = React.useState(false);
  const [err, setErr] = React.useState("false");
  React.useEffect(() => {
    setReviewLoader(true);
    FirebaseService.getRestaurantReviewRequest(id)
      .then((querySnapshot) => {
        let arr = [];
        querySnapshot.docs.map((doc) =>
          arr.push({ id: doc.id, ...doc.data() })
        );
        setReviews(arr);
        setReviewLoader(false);
      })
      .catch((err) => {
        setReviewLoader(false);
        setErr(err.message);
      });
      return () => {
        _isMounted.current = false;
      }
  }, [setReviewLoader, propValue, id]);

  return {
    reviews,
    reviewLoading,
    err,
  };
};

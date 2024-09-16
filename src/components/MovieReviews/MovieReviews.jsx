import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { fetchReviews } from "../../fetchAPi";
import css from "./MovieReviews.module.css";

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const data = await fetchReviews(movieId);
        setReviews(data.results || []); 
      } catch (error) {
        toast.error("Something went wrong. Please try again later.", {
          duration: 4000,
          position: "top-right",
        });
      }
    };
    getReviews();
  }, [movieId]); 

  return (
    <div className={css.reviewsContainer}>
      <h3 className={css.title}>Movie Reviews</h3>
      {reviews.length === 0 ? (
        <p className={css.noReviews}>This movie doesn't have any reviews</p>
      ) : (
        <ul className={css.list}>
          {reviews.map((review) => (
            <li key={review.id} className={css.reviewItem}>
              <h4 className={css.author}>User: {review.author}</h4>
              <p className={css.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
      <Toaster />
    </div>
  );
};

export default Reviews;

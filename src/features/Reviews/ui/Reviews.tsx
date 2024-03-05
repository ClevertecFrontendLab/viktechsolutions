import { Button } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { USER_LOCALSTORAGE_KEY } from '../../../shared/const/localstorage.ts';
import { ModalErrorReview } from '../index.ts';
import { getSeeReviews } from '../model/selectors/getSeeReviews.ts';
import { seeReviews } from '../model/services/seeReviews.ts';

import ModalErrorData from './ModalErrorData/ModalErrorData.tsx';
import ModalSuccess from './ModalSuccess/ModalSuccess.tsx';
import { ModalWriteReview } from './ModalWrireReview/ModalWriteReview.tsx';
import { ReviewItem } from './ReviewItem/ReviewItem.tsx';

import './Reviews.scss';
import { WriteReview } from './WriteReview/WriteReview.tsx';

const Reviews = memo(() => {
  const [openError, setOpenError] = useState(false);
  const [openErrorData, setOpenErrorData] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [displayedReviews, setDisplayedReviews] = useState([]);
  const [toggle, setToggle] = useState(false);
  const result = useSelector(getSeeReviews);
  const dispatch = useDispatch();
  const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || sessionStorage.getItem(USER_LOCALSTORAGE_KEY);
  const openModalWriteReview = () => {
    setOpen(true);
    setOpenErrorData(false); // Закрываем ModalErrorData при открытии ModalWriteReview
  };

  useEffect(() => {
    const fetchReviews = async () => {
      if (!result || result.length === 0) {
        try {
          await dispatch(seeReviews()).unwrap();
          // navigate('/main/feedbacks');
        } catch (error) {
          if (error?.errorCode === 403) {
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
            sessionStorage.removeItem(USER_LOCALSTORAGE_KEY);
            navigate('/auth');
          } else if (token && error?.errorCode) {
            setOpenError(true);
          }
        }
      } else {
        const sortedReviews = [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setDisplayedReviews(toggle ? sortedReviews : sortedReviews.slice(0, 4));
      }
    };

    fetchReviews();

  }, [dispatch, result, toggle, token]);

  const seeMore = () => {
    setToggle(!toggle);
  };

  return (

    <>
      {displayedReviews &&
                <div className="reviews">
                  <div className="box">
                    {displayedReviews.map((review) => (
                      <ReviewItem
                        key={review.id}
                        result={review}/>
                    ))
                    }
                  </div>
                  <footer>
                    <Button
                      data-test-id="write-review"
                      type="primary"
                      style={{ backgroundColor: 'var(--geekblue-light-6)', height: '40px' }}
                      onClick={() => setOpen(true)}>Написать отзыв</Button>
                    {displayedReviews.length >= 4 && <Button
                      data-test-id="all-reviews-button"
                      type="text"
                      style={{ color: 'var(--geekblue-light-6)', height: '40px' }}
                      onClick={seeMore}>{toggle ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}</Button>
                    }
                  </footer>
                  <ModalErrorReview
                    setOpenError={setOpenError}
                    openError={openError}/>
                </div>
      }
      {!result && <div className="reviews">
        <div className="box">
          <WriteReview/>
          <Button
            data-test-id="write-review"
            type="primary"
            style={{ backgroundColor: 'var(--geekblue-light-6)', height: '40px' }}
            onClick={() => setOpen(true)}>Написать отзыв</Button>
        </div>
      </div>}
      <ModalWriteReview
        setOpen={setOpen}
        open={open}
        setOpenSuccess={setOpenSuccess}
        setOpenErrorData={setOpenErrorData}/>
      <ModalSuccess
        openSuccess={openSuccess}
        setOpenSuccess={setOpenSuccess}/>
      <ModalErrorData
        open={openErrorData}
        setOpen={setOpenErrorData}
        onWriteReview={openModalWriteReview}
      />
    </>

  );
});

Reviews.displayName = 'Reviews';

export default Reviews;

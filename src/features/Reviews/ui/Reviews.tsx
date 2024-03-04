import { Button } from 'antd';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSeeReviews } from '../model/selectors/getSeeReviews.ts';
import { seeReviews } from '../model/services/seeReviews.ts';

import ModalSuccess from './ModalSuccess/ModalSuccess.tsx';
import { ModalWriteReview } from './ModalWrireReview/ModalWriteReview.tsx';
import { ReviewItem } from './ReviewItem/ReviewItem.tsx';

import './Reviews.scss';
import { WriteReview } from './WriteReview/WriteReview.tsx';

const Reviews = memo(() => {
  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [displayedReviews, setDisplayedReviews] = useState([]);
  const [toggle, setToggle] = useState(false);
  const result = useSelector(getSeeReviews);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!result || result.length === 0) {
      dispatch(seeReviews()).unwrap();
    } else {
      const sortedReviews = [...result].sort((a, b) => {
        // Предполагаем, что `createdAt` - это строка в формате ISO 8601
        // Преобразуем строки дат в объекты Date и сравниваем их
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      // Затем устанавливаем отсортированные отзывы, отображая либо все, либо первые 4
      setDisplayedReviews(toggle ? sortedReviews : sortedReviews.slice(0, 4));
    }
  }, [dispatch, result, toggle]);

  const seeMore = () => {
    setToggle(!toggle);
  };

  return (
    <>
      {displayedReviews && <div className="reviews">
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
            type="primary"
            style={{ backgroundColor: 'var(--geekblue-light-6)', height: '40px' }}
            onClick={() => setOpen(true)}>Написать отзыв</Button>
          {displayedReviews.length >= 4 && <Button
            type="text"
            style={{ color: 'var(--geekblue-light-6)', height: '40px' }}
            onClick={seeMore}>{toggle ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}</Button>
          }
        </footer>
      </div>
      }
      {!result && <div className="reviews">
        <div className="box">
          <WriteReview/>
          <Button
            type="primary"
            style={{ backgroundColor: 'var(--geekblue-light-6)', height: '40px' }}
            onClick={() => setOpen(true)}>Написать отзыв</Button>
        </div>
      </div>}
      <ModalWriteReview
        setOpen={setOpen}
        open={open}
        setOpenSuccess={setOpenSuccess}/>
      <ModalSuccess
        openSuccess={openSuccess}
        setOpenSuccess={setOpenSuccess}/>
    </>
  );
});

Reviews.displayName = 'Reviews';

export default Reviews;

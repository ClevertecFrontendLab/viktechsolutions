import { StarFilled, StarTwoTone } from '@ant-design/icons';
import { Button, Modal, Rate } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { seeReviews } from '../../model/services/seeReviews.ts';
import { seeReviewsPost } from '../../model/services/seeReviewsPost.ts';

interface ModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    setOpenSuccess: (openSuccess: boolean) => void;
}

export const ModalWriteReview = (props: ModalProps) => {
  const { open, setOpen, setOpenSuccess } = props;

  const [textAreaValue, setTextAreaValue] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const dispatch = useDispatch();

  const handleSubmit = useCallback(async () => {

    console.log(textAreaValue && rating);
    if (textAreaValue && rating) {
      try {
        dispatch(seeReviewsPost({ message: textAreaValue, rating })).unwrap();
        dispatch(seeReviews()).unwrap();
        setTextAreaValue('');
        setRating(0);
        setOpen(false);
        setOpenSuccess(true);
      } catch (e) {
        console.log(e);
      }
    }

  }, [dispatch, textAreaValue, rating, setOpen, setOpenSuccess]);
  const handleChange = (value: number) => {
    setRating(value);
    console.log(`Selected star rating: ${value}`);
    // Здесь можете добавить логику для обработки выбранного рейтинга
  };

  const customCharacter = (starProps: {
        index: number
    }) => {
    return rating > starProps.index ? <StarFilled/> : <StarTwoTone twoToneColor="gold"/>;
  };

  return (
    <Modal
      setOpenSuccess={setOpenSuccess}
      wrapClassName="modal-write"
      centered
      title={<div style={{ font: 'var(--font-h5)', fontWeight: 600, color: 'var(--title-light-85)' }}>
                Ваш отзыв</div>}
      open={open}
      maskStyle={{
        backgroundColor: 'rgba(70,150,236,0.5)',
        backdropFilter: 'blur(5px)',
      }}
      style={{ maxWidth: 'calc(100vw - 32px)' }}
      width={539}
      footer={[
        <Button
          key="submit"
          type="primary"
          style={{ backgroundColor: 'var(--geekblue-light-6)', height: '40px' }}
          onClick={handleSubmit}>
                    Опубликовать
        </Button>,
      ]}
    >
      <div style={{ marginBottom: 16 }}>
        <Rate
          character={customCharacter}
          onChange={handleChange}
          value={rating}
        />
      </div>
      <TextArea
        autoSize
        style={{ minHeight: 40 }}
        value={textAreaValue}
        onChange={(e) => setTextAreaValue(e.target.value)}
      > </TextArea>
    </Modal>

  );
};

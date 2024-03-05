import { StarFilled, StarTwoTone } from '@ant-design/icons';
import { Button, Modal, Rate } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { seeReviewsPost } from '../../model/services/seeReviewsPost.ts';

interface ModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    setOpenSuccess: (openSuccess: boolean) => void;
    setOpenErrorData: (openErrorData: boolean) => void;
}

export const ModalWriteReview = (props: ModalProps) => {
  const {
    open,
    setOpen,
    setOpenSuccess,
    setOpenErrorData,
  } = props;
    // const [openError, setOpenError] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const dispatch = useDispatch();

  const handleSubmit = useCallback(async () => {

    if (rating) {
      setOpen(false); // Скрываем модальное окно перед отправкой
      dispatch(seeReviewsPost({ message: textAreaValue, rating }))
        .unwrap()
        .then(() => {
          setOpenSuccess(true);
          setTextAreaValue('');
          setRating(0);
        })
        .catch((error) => {
          console.error(error);
          setOpenErrorData(true);
        });
    }

  }, [rating, setOpen, dispatch, textAreaValue, setOpenSuccess, setOpenErrorData]);
  const handleChange = (value: number) => {
    setRating(value);
  };

  const customCharacter = (starProps: {
        index: number
    }) => {
    return rating > starProps.index ? <StarFilled/> : <StarTwoTone twoToneColor="gold"/>;
  };

  return (
    <>
      <Modal
        setOpenSuccess={setOpenSuccess}
        wrapClassName="modal-write"
        centered
        title={<div
          style={{
            font: 'var(--font-h5)',
            fontWeight: 600,
            color: 'var(--title-light-85)',
          }}>
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
            data-test-id="new-review-submit-button"
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

    </>
  );
};

import { Button, Modal } from 'antd';

import NoOk from '../../../../shared/assets/icon/no_ok_icon.png';
import './ModalErrorData.scss';

interface ModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onWriteReview: () => void;
}

const ModalErrorData = (props: ModalProps) => {
  const { open, setOpen, onWriteReview } = props;
  const handleOk = () => {
    setOpen(false);
  };

  const handleWriteReview = () => {
    onWriteReview();
  };

  return (
    <Modal
      closable={false}
      cancelText
      centered
      open={open}
      footer={null}
      wrapClassName="modal-error-data"
      maskStyle={{
        backgroundColor: 'rgba(70,150,236,0.5)',
        backdropFilter: 'blur(5px)',
      }}
      width={539}
    >
      <div className="box">
        <img
          src={NoOk}
          alt="error"/>
        <h3 className="box__title">Данные не сохранились</h3>
        <p>Что-то пошло не так. Попробуйте ещё раз.</p>
        <div className="modal-error-data__buttons">
          <Button
            data-test-id="write-review-not-saved-modal"
            type="primary"
            onClick={handleWriteReview}
            style={{
              backgroundColor: 'var(--geekblue-light-6)',
              height: '40px',

              marginRight: '8px',
            }}>Написать
                        отзыв</Button>
          <Button
            type="primary"
            onClick={handleOk}
            style={{
              color: 'var(--primary-text-light-85)',
              backgroundColor: '#fff',
              height: '40px',
              border: '1px solid var(--gray-5)',
            }}>Закрыть</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalErrorData;

import { Button, Modal } from 'antd';

import NoOk from '../../../../shared/assets/icon/no_ok_icon.png';

interface ModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const ModalErrorData = (props: ModalProps) => {
  const { open, setOpen } = props;
  const handleOk = () => {
    setOpen(false);
  };

  return (
    <Modal
      closable={false}
      cancelText
      centered
      open={open}
      footer={null}
      className="modal"
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
        <Button
          data-test-id="write-review-not-saved-modal"
          type="primary"
          onClick={handleOk}
          style={{ backgroundColor: 'var(--geekblue-light-6)', height: '40px' }}>Написать отзыв</Button>
        <Button
          type="primary"
          onClick={handleOk}
          style={{ backgroundColor: '#fff', height: '40px' }}>Закрыть</Button>
      </div>
    </Modal>
  );
};

export default ModalErrorData;

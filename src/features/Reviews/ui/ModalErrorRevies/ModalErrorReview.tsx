import { Button, Modal } from 'antd';

import Error from '../../../../shared/assets/icon/forgot404.png';
import './ModalErrorReview.scss';

interface ModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const ModalErrorReview = (props: ModalProps) => {
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
          src={Error}
          alt="error"/>
        <h3 className="box__title">Что-то пошло не так</h3>
        <p>Произошла ошибка, попробуйте ещё раз.</p>
        <Button
          type="primary"
          onClick={handleOk}>Назад</Button>
      </div>
    </Modal>
  );
};

export default ModalErrorReview;

import { Button, Modal } from 'antd';

import Ok from '../../../../shared/assets/icon/ok_icon.png';
import './ModalSuccess.scss';

interface ModalProps {
    openSuccess: boolean;
    setOpenSuccess: (open: boolean) => void;
}

const ModalSuccess = (props: ModalProps) => {
  const { openSuccess, setOpenSuccess } = props;
  const handleOk = () => {
    setOpenSuccess(false);
  };

  return (
    <Modal
      closable={false}
      cancelText
      centered
      open={openSuccess}
      footer={null}
      style={{ maxWidth: 'calc(100vw - 32px)' }}
      wrapClassName="modal-success"
      maskStyle={{
        backgroundColor: 'rgba(70,150,236,0.5)',
        backdropFilter: 'blur(5px)',
      }}
      width={539}
    >
      <div className="box">
        <img
          src={Ok}
          alt="error"/>
        <h3 className="box__title">Отзыв успешно опубликован</h3>
        <Button
          type="primary"
          onClick={handleOk}
          style={{ backgroundColor: 'var(--geekblue-light-6)', height: '40px' }}
        >Отлично</Button>
      </div>
    </Modal>
  );
};

export default ModalSuccess;

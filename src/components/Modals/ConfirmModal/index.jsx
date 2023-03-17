import { useAtom } from 'jotai';
import React from 'react';
import { confirmModalAtom } from '../../../store';
import ModalLayout from '../ModalLayout';
import "./styles.css"

const ConfirmModal = ({message}) => {
  const [value,setConfirmModalAtomValue] = useAtom(confirmModalAtom)

  const handleCloseModal = () => setConfirmModalAtomValue(null)

  return (
    <ModalLayout>
      <div className='confirm-modal'>
        <h3 className='confirm-modal__message'>{message}</h3>
        <div className='confirm-modal__buttons'>
            <button onClick={handleCloseModal}>Cancel</button>
            <button onClick={value.onAccept}>Accept</button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default ConfirmModal;

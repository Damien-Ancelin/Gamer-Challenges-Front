import { useState } from 'react';
import Loader from '../../ui/Loader';
import ConfirmButton from './ConfirmButton';
import InitialButton from './InitialButton';
import FinalButton from './finalButton';

export default function DeleteAccountButton() {
  // State
  const [isLoading, setIsLoading] = useState(false);
  const [isActivatedDelete, setIsActivatedDelete] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  return (
    <>
      {!isActivatedDelete && (
        <InitialButton setIsActivatedDelete={setIsActivatedDelete} />
      )}

      {isActivatedDelete && !isConfirmed && (
        <ConfirmButton setIsConfirmed={setIsConfirmed} />
      )}

      {isConfirmed && !isLoading && (
        <FinalButton
          setIsConfirmed={setIsConfirmed}
          setIsActivatedDelete={setIsActivatedDelete}
          setIsLoading={setIsLoading}
        />
      )}

      {isLoading && <Loader />}
    </>
  );
}

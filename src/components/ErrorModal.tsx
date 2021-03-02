import React, { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ErrorModal.module.css';

export default function ErrorModal(){
  const { closeErrorModalLogin } = useContext(ChallengesContext)

  return (
    <div className={styles.overlay}>
      <div className={styles.levelUpModal__container}>
        <header className={styles.levelUpModal__title}>Ops!</header>
        <p className={styles.levelUpModal__body}>Este usuário não foi encontrado.</p>

        <button type="button" onClick={closeErrorModalLogin} className={styles.levelUpModal__buttonClose}>
          <img src="/icons/close.svg" alt="Fechar Modal"/>
        </button>
      </div>
    </div>
  );
}

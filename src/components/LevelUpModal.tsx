import React, { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/LevelUpModal.module.css';

export default function LevelUpModal(){

  const { level, closeLevelUpModal } = useContext(ChallengesContext)

  return (
    <div className={styles.overlay}>
      <div className={styles.levelUpModal__container}>
        <header className={styles.levelUpModal__title}>{level}</header>
        <strong className={styles.levelUpModal__message}>Parabéns</strong>
        <p className={styles.levelUpModal__body}>Você Alvançou um novo level.</p>

        <button type="button" onClick={closeLevelUpModal} className={styles.levelUpModal__buttonClose}>
          <img src="/icons/close.svg" alt="Fechar Modal"/>
        </button>
      </div>
    </div>
  );
}

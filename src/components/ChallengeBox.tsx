import React, { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountDownContext } from '../contexts/CountDownContext';

import styles from '../styles/components/ChallengeBox.module.css';

export default function ChallengeBox(){

  const { activeChallenge, resetChallenge, completedChallege} = useContext(ChallengesContext)
  const { resetCountDown } = useContext(CountDownContext)

  function handleChallengeSuccessed(){
    completedChallege()
    resetCountDown()
  }

  function handleChallengeFailed(){
    resetChallenge()
    resetCountDown()
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {
        activeChallenge ? (
          <div className={styles.challengeBoxActive}>
            <header className={styles.challengeBoxActive__header}>Ganhe {activeChallenge.amount} XP</header>
            <main className={styles.challengeBoxActive__content}>
              <img src={`icons/${activeChallenge.type}.svg`} alt="icons"  className={styles.challengeBoxActive__img }/>
              <strong className={styles.challengeBoxActive__titleInfo}>Novo Desafio</strong>
              <p className={styles.challengeBoxActive__description}>{activeChallenge.description}</p>
            </main>
            <footer className={styles.challengeBoxActive__footer}>
              <button
               type="button" 
               className={styles.challengeFailButton
               }
               onClick={handleChallengeFailed}>
                Falhei
              </button>
              <button
                type="button" 
                className={styles.challengeSuccessedButton}
                onClick={handleChallengeSuccessed}
               >
                Completei
              </button>
            </footer>
          </div>
        ) : (
          <div className={styles.challengeBoxContainer__active}>
            <strong className={styles.challengeBoxContainer__title}>Finalize um ciclo para receber desafios</strong>
            <p className={styles.challengeBoxContainer__info}>
              <img className={styles.challengeBoxContainer__info__img} src="icons/level-up.svg" alt="Level up"/>
              Avance de Level completando desafios
            </p>
          </div>
        )
      }
      
    </div>
  );
}

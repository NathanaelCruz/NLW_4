import { useContext } from 'react'
import { CountDownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/CountDown.module.css'


export default function CountDown () {

  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountDown,
    resetCountDown
  } = useContext(CountDownContext)

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  return (
    <div>
      <div className={styles.countContainer}>
        <div className={styles.countContainer__counter}>
          <span className={styles.countContainer__counterNumber}>{minuteLeft}</span>
          <span className={styles.countContainer__counterNumber}>{minuteRight}</span>
        </div>
        <span className={styles.countContainer__counterSeparator}>:</span>
        <div className={styles.countContainer__counter}>
          <span className={styles.countContainer__counterNumber}>{secondLeft}</span>
          <span className={styles.countContainer__counterNumber}>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
          <button
            disabled
            className={`${styles.btnCountDown} ${styles.btnIsDisabled}`}>
            Ciclo Encerrado
          </button>
      ) : (
        <>
          { 
            isActive ? (
              <button type="button" className={`${styles.btnCountDown} ${styles.btnCountDownActive}`} onClick={resetCountDown}>
                Abandonar Ciclo
              </button>
            ) : (
              <button type="button" className={styles.btnCountDown} onClick={startCountDown}>
                Iniciar um Ciclo
              </button>
            )
          }
        </>
      )}


    </div>
  )
}
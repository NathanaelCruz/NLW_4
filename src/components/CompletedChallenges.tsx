import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/CompletedChallenges.module.css'
export default function CompletedChallenges () {

  const { challengesCompleted} = useContext(ChallengesContext)
  return (
    <div className={styles.completedChallengesContent}>
      <span className={styles.completedChallenges__title}>Desafios completos</span>
      <span className={styles.completedChallenges__qtd}>{challengesCompleted}</span>
    </div>
  )
}
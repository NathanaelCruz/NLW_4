import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'
export default function Profile() {

  const { level } = useContext(ChallengesContext)
  
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/NathanaelCruz.png" alt="Nathanael Cruz" className={styles.profileContainer__imgPerfil} />
      <div className={styles.profileContainer__info}>
        <strong className={styles.profileContainer__name}>Nathanael Cruz</strong>
        <p className={styles.profileContainer__levelInfo}>
          <img src="icons/level.svg" alt="icone de nível" className={styles.profileContent__imgLevel}/> Nível {level}
        </p>
      </div>
    </div>
  )
}
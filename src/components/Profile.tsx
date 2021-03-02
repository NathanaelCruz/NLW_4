import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'
export default function Profile() {

  const { level, userNameGitHub, userAvatarGitHub } = useContext(ChallengesContext)
  
  return (
    <div className={styles.profileContainer}>
      <img src={userAvatarGitHub} alt={userNameGitHub} className={styles.profileContainer__imgPerfil} />
      <div className={styles.profileContainer__info}>
        <strong className={styles.profileContainer__name}>{userNameGitHub}</strong>
        <p className={styles.profileContainer__levelInfo}>
          <img src="icons/level.svg" alt="icone de nível" className={styles.profileContent__imgLevel}/> Nível {level}
        </p>
      </div>
    </div>
  )
}
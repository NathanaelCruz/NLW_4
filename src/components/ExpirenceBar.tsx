import React, { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperenceBar.module.css'

const ExperenceBar: React.FC = () => {

  const { currentExperence, experenceToNextLevel } = useContext(ChallengesContext)

  const percentToNextLevel = Math.round((currentExperence * 100)) / experenceToNextLevel

  return (
    <header className={styles.experenceBar}>
      <span>0 xp</span> 
      <div>
        <div style={{width: `${percentToNextLevel}%`}}></div>
        <span className={styles.currentExperence} style={{left: `${percentToNextLevel}%`}}>{currentExperence}xp</span>
      </div>
      <span>{experenceToNextLevel} xp</span>
    </header>);
}

export default ExperenceBar;
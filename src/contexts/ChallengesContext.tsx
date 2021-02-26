import { createContext, useState, ReactNode, useEffect} from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import LevelUpModal from '../components/LevelUpModal'

interface Challange {
  type: 'body' | 'eye',
  description: string,
  amount: number
}

interface ChallengesContextData {
  level: number, 
  currentExperence: number, 
  challengesCompleted: number, 
  activeChallenge: Challange,
  experenceToNextLevel: number,
  levelUp: () => void,
  startNewChallenge: () => void,
  resetChallenge: () => void,
  closeLevelUpModal: () => void,
  completedChallege: () => void
}

interface ChallengesProviderProps {
  children: ReactNode,
  level: number,
  currentExperence: number,
  challengesCompleted: number
}

export const ChallengesContext = createContext({} as ChallengesContextData)


export function ChallengesProvider({children, ...rest} : ChallengesProviderProps){


  const [level, setLevel] = useState(rest.level ?? 1)
  const [currentExperence, setCurrentExperence] = useState(rest.currentExperence ?? 0)
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [ isLevelUpModalOpen, setIsLevelUpModalOpen ] = useState(false)

  const experenceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExperence', String(currentExperence))
    Cookies.set('challengesCompleted', String(challengesCompleted))
  }, [level, currentExperence, challengesCompleted])

  function levelUp(){
    setLevel(level + 1)
    setIsLevelUpModalOpen(true)
  }

  function closeLevelUpModal(){
    setIsLevelUpModalOpen(false)
  }

  function startNewChallenge(){
    const randomChallengeIndex = Math.floor( Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play()

    if(Notification.permission === 'granted'){
      new Notification('Novo Desafio 🎉', {
        body: `valendo ${challenge.amount} de XP!`
      })
    }

  }


  function resetChallenge(){
    setActiveChallenge(null)
  }

  function completedChallege() {
    if(!activeChallenge){
      return
    }

    const { amount } = activeChallenge

    let finalExperence = currentExperence + amount

    if(finalExperence >= experenceToNextLevel){
      finalExperence = finalExperence - experenceToNextLevel
      levelUp()
    }

    setCurrentExperence(finalExperence)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
  }

  return (
    <ChallengesContext.Provider
      value={{
        level, 
        currentExperence, 
        challengesCompleted, 
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experenceToNextLevel,
        completedChallege,
        closeLevelUpModal
        }}>
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}
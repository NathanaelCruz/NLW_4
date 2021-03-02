import { createContext, useState, ReactNode, useEffect} from 'react'
import Router from 'next/router'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import LevelUpModal from '../components/LevelUpModal'
import Login from '../components/Login'
import Axios from 'axios'
import ErrorModal from '../components/ErrorModal'

interface Challange {
  type: 'body' | 'eye',
  description: string,
  amount: number
}

interface ChallengesContextData {
  level: number, 
  currentExperence: number, 
  challengesCompleted: number, 
  userNameGitHub: string,
  userAvatarGitHub: string,
  activeChallenge: Challange,
  experenceToNextLevel: number,
  levelUp: () => void,
  startNewChallenge: () => void,
  resetChallenge: () => void,
  closeLevelUpModal: () => void,
  loginGitHub: (string: string) => void,
  completedChallege: () => void,
  closeErrorModalLogin: () => void
}

interface ChallengesProviderProps {
  children: ReactNode,
  level: number,
  currentExperence: number,
  challengesCompleted: number,
  userNameGitHub: string,
  userAvatarGitHub: string,
  isLogin: number
}

export const ChallengesContext = createContext({} as ChallengesContextData)


export function ChallengesProvider({children, ...rest} : ChallengesProviderProps){


  const [level, setLevel] = useState(rest.level ?? 1)
  const [currentExperence, setCurrentExperence] = useState(rest.currentExperence ?? 0)
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [ isLevelUpModalOpen, setIsLevelUpModalOpen ] = useState(false)
  const [ isLogin, setIsLogin ] = useState(rest.isLogin ?? 0)
  const [ userNameGitHub, setUserNameGitHub ] = useState(rest.userNameGitHub ?? '')
  const [ userAvatarGitHub, setUserAvatarGitHub ] = useState(rest.userAvatarGitHub ?? '')
  const [ modalErrorLogin, setModalErrorLogin ] = useState(false)

  const experenceToNextLevel = Math.pow((level + 1) * 4, 2)


  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExperence', String(currentExperence))
    Cookies.set('challengesCompleted', String(challengesCompleted))
    Cookies.set('userNameGitHub', String(userNameGitHub))
    Cookies.set('userAvatarGitHub', String(userAvatarGitHub))
    Cookies.set('isLogin', String(isLogin))

  }, [level, currentExperence, challengesCompleted, isLogin, userNameGitHub, userAvatarGitHub])

  function levelUp(){
    setLevel(level + 1)
    setIsLevelUpModalOpen(true)
  }

  function closeLevelUpModal(){
    setIsLevelUpModalOpen(false)
  }

  function closeErrorModalLogin(){
    setModalErrorLogin(false)
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

  function loginGitHub(user){
    Axios.get(`https://api.github.com/users/${user}`).then(responde => {
      setIsLogin(1)
      setUserNameGitHub(responde.data.name)
      setUserAvatarGitHub(responde.data.avatar_url)

    }).catch(error => setModalErrorLogin(true))

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
        userNameGitHub,
        userAvatarGitHub,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experenceToNextLevel,
        completedChallege,
        closeLevelUpModal,
        loginGitHub,
        closeErrorModalLogin
        }}>
      {isLogin ? children : <Login />}
      {modalErrorLogin && <ErrorModal />}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}
import { createContext, useState, ReactNode, useEffect} from 'react'
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
  const [ user, setUser ] = useState({})
  const [ idUser, setIdUser ] = useState(0)

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

  useEffect(() => {

    if(Object.keys(user).length >= 1){
      findUser(user)
    }
  }, [user])

  useEffect(() => {
    if(Object.keys(user).length >= 1){
      updateUser(user)
    }
  }, [level, currentExperence, challengesCompleted])


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

  function loginGitHub(userLogin){
    Axios.get(`https://api.github.com/users/${userLogin}`).then(responde => {
      setIsLogin(1)
      setUserNameGitHub(responde.data.name)
      setUserAvatarGitHub(responde.data.avatar_url)
      setUser(responde.data)
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

  function findUser(user){
    console.log(user)
    Axios.get(`http://localhost:3002/users?login=${user.login.toUpperCase()}`).then(resp => {

      if(Object.keys(resp.data).length > 0){
        setIdUser(resp.data[0].id)
        setUserNameGitHub(resp.data[0].name)
        setUserAvatarGitHub(resp.data[0].avatar_url)
        setLevel(resp.data[0].level)
        setCurrentExperence(resp.data[0].currentExperence)
        setChallengesCompleted(resp.data[0].challengesCompleted)
      } else {
        Axios.post(`http://localhost:3002/users`, {
          login: user.login.toUpperCase(),
          name: user.name.toUpperCase(),
          avatar_url: user.avatar_url,
          level: 1,
          currentExperence: 0,
          challengesCompleted: 0
        }).then(resp => {
          setIdUser(resp.data.id)
        })

        setUserNameGitHub(user.name.toUpperCase())
        setUserAvatarGitHub(user.avatar_url)
        setLevel(1)
        setCurrentExperence(0)
        setChallengesCompleted(0)
      }
    })
  }

  function updateUser(user){
    Axios.put(`http://localhost:3002/users/${idUser}`, {
      login: user.login.toUpperCase(),
      name: user.name.toUpperCase(),
      avatar_url: user.avatar_url,
      level: level,
      currentExperence: currentExperence,
      challengesCompleted: challengesCompleted
    })
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
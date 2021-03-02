import CompletedChallenges from '../components/CompletedChallenges';
import CountDown from '../components/CountDown';
import ExperenceBar from '../components/ExpirenceBar';
import Profile from '../components/Profile';
import styles from '../styles/pages/Dashboard.module.css'
import Head from 'next/head'

import { GetServerSideProps } from 'next'

import ChallengeBox from '../components/ChallengeBox';
import { CountDownProvider } from '../contexts/CountDownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface DashboardProps {
  level: number,
  currentExperence: number,
  challengesCompleted: number,
  userNameGitHub: string,
  userAvatarGitHub: string,
  isLogin: number
}

export default function Dashboard(props) {
  return (

    <ChallengesProvider
     level={props.level} 
     currentExperence={props.currentExperence}
     challengesCompleted={props.challengesCompleted}
     userNameGitHub={props.userNameGitHub}
     userAvatarGitHub={props.userAvatarGitHub}
     isLogin={props.isLogin}
     >
      <div className={styles.container}>
        <Head>
          <title>Inicio | MoveIt</title>
        </Head>

        
        <ExperenceBar />

        <CountDownProvider>
          <section>
            <div>
              <Profile></Profile>
              <CompletedChallenges />
              <CountDown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountDownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps:GetServerSideProps = async (ctx) => {

  const { level, currentExperence, challengesCompleted, isLogin, userNameGitHub,  userAvatarGitHub} = ctx.req.cookies
  
  return {
    props: {
      level: Number(level),
      currentExperence: Number(currentExperence),
      challengesCompleted: Number(challengesCompleted),
      isLogin: Number(isLogin),
      userNameGitHub: String(userNameGitHub),
      userAvatarGitHub: String(userAvatarGitHub)
    }
  }

}
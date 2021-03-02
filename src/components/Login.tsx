import styles from '../styles/components/FormLogin.module.css'
import stylesLogin from '../styles/pages/Login.module.css'
import React, { useContext } from 'react';
import Head from 'next/head';
import { ChallengesContext } from '../contexts/ChallengesContext';

export default function Login(props) {


  const { loginGitHub } = useContext(ChallengesContext)

  let userInputText = ''

  const setNameUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    userInputText = event.target.value
  }
  
  return (

      <>
        <Head>
          <title>Login | MoveIt</title>
        </Head>

        <div role="contentinfo" className={stylesLogin.login__container}>
          <figure className={stylesLogin.login__figure}>
            <img src="/logo-login.svg" alt="Logo da tela de login"/>
          </figure>

          <form action="#" className={styles.login__form}>
          <img src="/logo-fullB.svg" alt="Logo" className={styles.login__image} />
          <div role="contentinfo">
            <h2 className={styles.login__title}>Bem-vindo</h2>

            <p className={styles.login__message}><img src="/icons/github-icon.svg" alt="Logo GitHub"/> Faça login com seu Github para começar</p>
            <footer className={styles.login__footer}>
                <input type="text" className={styles.login__formInputText} placeholder="Digite seu username" onChange={setNameUser}/>
                <button type="button" className={styles.login__button} onClick={() => loginGitHub(userInputText)}><img src="/icons/arrow.svg" /></button>
            </footer>
          </div>
        </form>
        </div>

      </>
    )
}

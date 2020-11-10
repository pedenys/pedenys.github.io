import React, { useState } from "react"
import { graphql } from "gatsby"
import styled from "@emotion/styled"

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  min-height: -webkit-fill-available; // webkit browsers
  min-height: 100vh;
`

const IntroductionContainer = styled.main`
  max-width: 600px;
  h1,
  h2 {
    margin: 0;
    padding: 0;
  }
  h1 {
    font-size: 5rem;
    margin-bottom: 4rem;
  }
  @media screen and (max-width: 400px) {
    h1 {
      font-size: 3.2rem;
    }
  }
`

const LanguageSwitch = styled.div`
  position: fixed;
  right: 25px;
  bottom: 15px;
  font-size: 3rem;
`

const IntroductionFr = () => {
  return (
    <>
      <h1>
        Salut&nbsp;
        <span role="img" aria-label="how are you emoji">
          👋
        </span>
      </h1>
      <p>
        Après quelques années passées en compagnie de la{" "}
        <a
          href="http://lepetitnietzsche.fr"
          rel="noopener noreferrer"
          target="_blank"
          lang="fr"
        >
          Philosophie
        </a>{" "}
        et des{" "}
        <a
          href="https://archinfo24.hypotheses.org/3262"
          rel="noopener noreferrer"
          target="_blank"
          lang="fr"
        >
          Humanités numériques
        </a>
        , je suis devenu développeur —&nbsp;en attendant ma prochaine mue.
      </p>
      <p>
        J'aime la philosophie continentale, la campagne, manger et les belles
        choses (mais pas nécessairement manger de belles choses).
      </p>
    </>
  )
}
const IntroductionEn = () => {
  return (
    <>
      <h1>
        Hi&nbsp;
        <span role="img" aria-label="how are you emoji">
          👋
        </span>
      </h1>
      <p>
        After a few years spent in{" "}
        <a
          href="http://lepetitnietzsche.fr"
          rel="noopener noreferrer"
          target="_blank"
          lang="fr"
        >
          Social sciences
        </a>{" "}
        then{" "}
        <a
          href="https://archinfo24.hypotheses.org/3262"
          rel="noopener noreferrer"
          target="_blank"
          lang="fr"
        >
          Digital Humanities
        </a>
        , I became a JavaScript developer, waiting for my next mutation.
      </p>
      <p>
        I like continental philosophy, countryside, eating and beautiful things
        (not eating beautiful things though).
      </p>
    </>
  )
}

const About = () => {
  const [isFrench, setIsFrench] = useState(true)

  const handleClickOnSwitch = () => {
    setIsFrench(val => !val)
  }
  return (
    <HomeContainer>
      <IntroductionContainer>
        {isFrench ? <IntroductionFr /> : <IntroductionEn />}
      </IntroductionContainer>
      <LanguageSwitch onClick={handleClickOnSwitch}>
        {isFrench ? (
          <span role="img" aria-label="usa flag">
            🇺🇸
          </span>
        ) : (
          <span role="img" aria-label="french flag">
            🇫🇷
          </span>
        )}
      </LanguageSwitch>
    </HomeContainer>
  )
}

export default About

export const pageQuery = graphql`
  query MetaDataQueryForAbout {
    site {
      siteMetadata {
        author {
          description
        }
      }
    }
  }
`

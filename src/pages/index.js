import React from "react"
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

const BioContainer = styled.main`
  max-width: 600px;
  h1,
  h2 {
    margin: 0;
    padding: 0;
  }
  h1 {
    font-size: 5rem;
    margin-bottom: 3rem;
    line-height: 40px;
    word-spacing: -10px;
  }
  h2 {
    font-size: 3.5rem;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 400px) {
    h1 {
      font-size: 3.2rem;
      margin-bottom: 10px;
    }
    h2 {
      font-size: 2rem;
    }
  }
`

export default function Home({ data }) {
  const {
    author: { name, description },
  } = data.site.siteMetadata

  return (
    <HomeContainer>
      <BioContainer>
        <h1>{name}</h1>
        <h2>{description}</h2>
      </BioContainer>
    </HomeContainer>
  )
}

export const pageQuery = graphql`
  query MetaDataQueryForHome {
    site {
      siteMetadata {
        author {
          name
          description
        }
      }
    }
    image: file(base: { eq: "cute-dog.jpg" }) {
      publicURL
    }
  }
`

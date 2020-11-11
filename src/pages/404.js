import styled from "@emotion/styled"
import React from "react"
import { navBarHeight } from "../components/nav"

const PageNotFoundContainer = styled.div`
  height: calc(100vh - ${navBarHeight * 2}px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    text-align: center;
  }
`

const NotFoundPage = () => {
  return (
    <PageNotFoundContainer>
      <h1>
        <span aria-label="page not found">¯\_(ツ)_/¯</span>
      </h1>
      <p>Il n'y a rien ici</p>
    </PageNotFoundContainer>
  )
}

export default NotFoundPage

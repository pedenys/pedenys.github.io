import styled from "@emotion/styled"
import React from "react"
import Nav from "./nav"

// red, yellow, blue, mint, cyan
const pastelColors = ["#FEBCC8", "#FFFFD8", "#EAEBFF"]

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function getRandomBgColor() {
  const num = getRandomArbitrary(0, 3)
  return pastelColors[num]
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
`
const LayoutNavContainer = styled.div`
  flex-grow: 0;
  height: 50px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;

  display: flex;
`
const LayoutChildrenContainer = styled.div`
  flex-grow: 1;
  margin: 0 auto;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
`

const Layout = ({ children }) => {
  return (
    <Container>
      <LayoutNavContainer>
        <Nav />
      </LayoutNavContainer>
      <LayoutChildrenContainer>{children}</LayoutChildrenContainer>
    </Container>
  )
}

export default Layout

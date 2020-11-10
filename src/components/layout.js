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
  padding: 0 2rem;
  margin: 0 auto;
  max-width: 600px;
`

const Layout = ({ children }) => {
  document.body.style.backgroundColor = getRandomBgColor()
  return (
    <Container>
      <Nav />
      {children}
    </Container>
  )
}

export default Layout

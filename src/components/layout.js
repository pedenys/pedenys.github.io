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
  margin: 0 auto;
  max-width: 600px;
  width: 100%;
  min-height: -webkit-fill-available; // webkit browsers
  min-height: 100vh;
`

const Layout = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: getRandomBgColor(),
        maxWidth: "100%",
        width: "100%",
        height: "100%",
      }}
    >
      <Container>
        <div style={{ padding: "0 1rem" }}>
          <Nav />
          {children}
        </div>
      </Container>
    </div>
  )
}

export default Layout

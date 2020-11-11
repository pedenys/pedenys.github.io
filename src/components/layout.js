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

const SiteContainer = styled.div`
  min-height: 100vh;
  padding: 0 2rem;
  margin: 0 auto;
  max-width: 600px;
`

// @emotion CSS-in-JS cannot be used in Layout, probably due to use of wrapPageElement in gatsby-browser.js

const Layout = ({ children }) => {
  if (typeof window !== `undefined`) {
    document.body.style.backgroundColor = getRandomBgColor()
  }
  return (
    <SiteContainer>
      <Nav />
      {children}
    </SiteContainer>
  )
}

export default Layout

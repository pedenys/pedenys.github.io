import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"

export const navBarHeight = "50"

const NavContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: ${navBarHeight}px;
  max-width: 400px;
  margin: 0 auto;

  li {
    list-style-type: none;
    @media screen and (min-width: 400px) {
      a  {
        margin-right: 4rem;
      }
      a:last-of-type {
        margin-right: 0;
      }
    }
  }
`

const Nav = () => {
  return (
    <NavContainer>
      <li>
        <Link to="/">pedenys</Link>
      </li>
      <li>
        <a href="https://github.com/pedenys">github</a>
      </li>
      <li>
        <Link to="/about">about</Link>
      </li>
      <li>
        <Link to="/blog">blog</Link>
      </li>
    </NavContainer>
  )
}

export default Nav

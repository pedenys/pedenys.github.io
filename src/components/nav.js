import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"

const NavContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  li {
    list-style-type: none;
    margin-right: 4rem;
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
        <Link to="/blog">blog</Link>
      </li>
      <li>
        <a href="https://github.com/pedenys">github</a>
      </li>
      <li>
        <Link to="/about">about</Link>
      </li>
    </NavContainer>
  )
}

export default Nav

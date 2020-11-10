import React from "react"
import { graphql, Link } from "gatsby"
import styled from "@emotion/styled"

const BlogContainer = styled.div`
  h1 {
    margin: 1rem 0 2rem;
    text-align: center;
    font-size: 2.4rem;
  }
  article {
    h2 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    small {
      margin: 1rem 0;
    }
    p {
      font-size: 1.25rem;
    }
  }
  @media screen and (min-width: 400px) {
    h1 {
      margin: 3rem 0;
      font-size: 4rem;
    }
    article {
      margin-bottom: 3.5rem;
      h2 {
        font-size: 2.4rem;
      }
      p {
        font-size: 1.6rem;
      }
    }
  }
`

export default function Blog({ data }) {
  const { posts } = data.blog

  return (
    <BlogContainer>
      <h1>Memento</h1>

      {posts.map(post => (
        <article key={post.id}>
          <Link to={post.fields.slug}>
            <h2>{post.frontmatter.title}</h2>
          </Link>
          <small>
            {post.frontmatter.author}, {post.frontmatter.date}
          </small>
          <p>{post.frontmatter.excerpt}</p>
        </article>
      ))}
    </BlogContainer>
  )
}

export const pageQuery = graphql`
  query MyQuery {
    blog: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      posts: nodes {
        fields {
          slug
        }
        frontmatter {
          date(fromNow: true)
          title
          author
          excerpt
        }
        excerpt
        id
      }
    }
  }
`

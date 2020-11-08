import React from "react"
import { graphql, Link } from "gatsby"
import styled from "@emotion/styled"

const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    margin: 4rem 0;
    text-align: center;
  }
`

export default function Blog({ data }) {
  const { posts } = data.blog

  return (
    <BlogContainer>
      <h1>Quelques idées</h1>

      {posts.map(post => (
        <article key={post.id}>
          <Link to={post.fields.slug}>
            <h2>{post.frontmatter.title}</h2>
          </Link>
          <small>
            {post.frontmatter.author}, {post.frontmatter.date}
          </small>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </BlogContainer>
  )
}

export const pageQuery = graphql`
  query MyQuery {
    blog: allMarkdownRemark {
      posts: nodes {
        fields {
          slug
        }
        frontmatter {
          date(fromNow: true)
          title
          author
        }
        excerpt
        id
      }
    }
  }
`

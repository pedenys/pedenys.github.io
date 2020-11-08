// prismjs theme
import "prismjs/themes/prism-twilight.css"
// prismjs terminal theme
import "prismjs/plugins/command-line/prism-command-line.css"
import "./src/components/globalStyle.css"

import React from "react"
import Layout from "./src/components/Layout"

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>
}

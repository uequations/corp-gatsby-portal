import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Container from "@material-ui/core/Container"
import Home from "../components/Home"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    flexGrow: 1
  }
}))

export default function IndexPage() {

  const classes = useStyles()

  return (
    <Layout>
      <SEO title="Employee Portal | Universal Equations"/>
      <Container className={classes.rootContainer}>
        <Home/>
      </Container>
    </Layout>)
}

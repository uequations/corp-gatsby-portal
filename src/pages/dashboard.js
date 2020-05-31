import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Container from "@material-ui/core/Container"
import Dashboard from "../components/Dashboard"
import { makeStyles } from "@material-ui/core/styles"
import { Router } from "@reach/router"

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    flexGrow: 1
  }
}))

export default function DashboardPage() {

  const classes = useStyles()

  return (
    <Layout>
      <SEO title="Employee Portal | Universal Equations"/>
      <Container className={classes.rootContainer}>
        <Router>
          <Dashboard path={"/dashboard"}/>
        </Router>
      </Container>
    </Layout>)
}

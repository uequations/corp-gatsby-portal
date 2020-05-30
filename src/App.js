import React from "react"
import { Router, Route, Switch } from "react-router-dom"
import SEO from "./components/seo"
import VerticalTabPanel from "./components/VerticalTabPanel"
import Layout from "./components/layout"
import { useAuth0 } from "./auth/auth0-spa"
import Skeleton from "@material-ui/lab/Skeleton"
import history from "./auth/history"
import Home from "./pages/Home"
import Container from "@material-ui/core/Container"
import { makeStyles } from "@material-ui/core/styles"
import PrivateRoute from "./auth/PrivateRoute"

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    flexGrow: 1
  }
}))

export default function App() {

  const { loading } = useAuth0()

  const classes = useStyles()

  if (loading) {
    return <Skeleton variant="rect" height={500}/>
  }

  return (
    <Router history={history}>
      <Layout>
        <SEO title="Employee Portal | Universal Equations"/>
        <Container className={classes.rootContainer}>
          <Switch>
            <Route path={"/"} exact component={Home}/>
            <PrivateRoute path={"/dashboard"} component={VerticalTabPanel}/>
          </Switch>
        </Container>
      </Layout>
    </Router>
  )
}

import React from "react"
import siteTheme from "../theme"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Button from "@material-ui/core/Button"
import withStyles from "@material-ui/core/styles/withStyles"
import PropTypes from "prop-types"
import { useAuth0 } from "../auth/auth0-spa"
import { Link as RouterLink } from "react-router-dom"


const backgroundImage = "https://unsplash.com/photos/7d4LREDSPyQ"

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: siteTheme.palette.primary.main, // Average color of the background image.
    backgroundPosition: "center"
  },
  button: {
    minWidth: 200
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(10)
    }
  },
  more: {
    marginTop: theme.spacing(2)
  }
})

function Hero(props) {

  const { classes } = props

  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin
    })

  return (
    <section className={classes.background}>
      <Container>
        <img className="mb-3 app-logo" src={backgroundImage} alt="" width="120"/>
        <Typography color={"inherit"} align={"center"} variant={"h2"} marked={"center"}>UEQUATIONS EMPLOYEE
          PORTAL</Typography>
        {!isAuthenticated && (
          <Button
            color={"secondary"}
            variant={"contained"}
            size={"large"}
            className={classes.button}
            onClick={() => loginWithRedirect({})}>
            LOGIN
          </Button>)}
        {isAuthenticated && (
          <Button
            color={"secondary"}
            variant={"contained"}
            size={"large"}
            className={classes.button}
            component={RouterLink}
            to={"/dashboard"}>
            DASHBOARD
          </Button>
        )}
        {isAuthenticated && (
          <Button
            color={"secondary"}
            variant={"contained"}
            size={"large"}
            className={classes.button}
            onClick={() => logoutWithRedirect()}>
            LOGOUT
          </Button>
        )}
      </Container>
    </section>
  )
}

Hero.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Hero)

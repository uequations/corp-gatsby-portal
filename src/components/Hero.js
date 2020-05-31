import React from "react"
import siteTheme from "../theme"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Button from "@material-ui/core/Button"
import withStyles from "@material-ui/core/styles/withStyles"
import PropTypes from "prop-types"
import { useAuth0 } from "../auth/auth0-spa"
import { Link as RouterLink } from "react-router-dom"


const backgroundImage = "https://res.cloudinary.com/uequations/image/upload/v1590883171/corp-gatsby-portal/nesa-by-makers-7d4LREDSPyQ-unsplash_1.jpg"

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: siteTheme.palette.primary.main, // Average color of the background image.
    backgroundPosition: "center"
  },
  button: {
    minWidth: 200
  },
  heroText: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(10)
    }
  },
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      height: "80vh",
      minHeight: 500,
      maxHeight: 1300
    },
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(14)
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
      <Container className={classes.container}>
        <Typography className={classes.heroText} color={"primary"} align={"center"} variant={"h2"} marked={"center"}>UEQ
          EMPLOYEE
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
      </Container>
    </section>
  )
}

Hero.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Hero)

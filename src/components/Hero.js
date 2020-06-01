import React from "react"
import siteTheme from "../theme"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Button from "@material-ui/core/Button"
import withStyles from "@material-ui/core/styles/withStyles"
import PropTypes from "prop-types"
import { Link as RouterLink } from "gatsby"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Paper from "@material-ui/core/Paper"


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
    marginTop: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(2)
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
  },
  card: {
    marginTop: theme.spacing(40),
    minWidth: 275,
    alignItems: "center",
    display: "flex",
    flexDirection: "column"
  }
})

function Hero(props) {

  const { classes } = props

  return (
    <Paper elevation={4} className={classes.background}>
      <Container className={classes.container}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.heroText} color={"primary"} align={"center"} variant={"h3"}
                        marked={"center"}>UEQ
              EMPLOYEE
              PORTAL</Typography>
          </CardContent>
          <CardActions>
              <Button
                color={"secondary"}
                variant={"contained"}
                size={"large"}
                className={classes.button}
                component={RouterLink}
                to={"/dashboard"}>
                LOGIN
              </Button>
          </CardActions>
        </Card>
      </Container>
    </Paper>
  )
}

Hero.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Hero)

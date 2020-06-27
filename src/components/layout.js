/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import Navbar from "./Navbar"
import "typeface-roboto"
import makeStyles from "@material-ui/core/styles/makeStyles"
import siteTheme from "../theme"
import { ThemeProvider } from "@material-ui/core/styles"


const useStyles = makeStyles((theme) => ({
    container: {
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      height: "1000px",
      backgroundColor: "#FFFFFF"
    },
    subscribeButton: {
      alignItems: "center",
      marginTop: "40px"
    },
    copyright: {
      textAlign: "center",
      paddingTop: "20px",
      paddingBottom: "20px",
      backgroundColor: "#9EA4D3",
      color: "#FFFFFF",
      textTransform: "uppercase",
      fontWeight: "lighter",
      letterSpacing: "2px",
      borderTopWidth: "2px"
    }
  }
))

const Layout = ({ children }) => {

  const classes = useStyles()

  return (
    <ThemeProvider theme={siteTheme}>
      <div className={classes.container}>
        <Navbar/>
        <main>{children}</main>
        <div className={classes.copyright}>&copy;2020 UNIVERSAL EQUATIONS-<strong>ALL RIGHTS RESERVED</strong></div>
      </div>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout

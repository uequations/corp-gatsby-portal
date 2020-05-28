import React, { useState } from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import SocialPostForm from "./forms/SocialPostForm"
import Paper from "@material-ui/core/Paper"
import Container from "@material-ui/core/Container"

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div style={{ width: "100%" }}
         role={"tabpanel"}
         hidden={value !== index}
         id={`vertical-tabpanel-${index}`}
         aria-labelledby={`vertical-tab-${index}`}
         {...other}
    >
      {value === index && (
        <Container maxWidth={"md"}>
          <Box
            p={3}
            m={3}>
            {children}
          </Box>
        </Container>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function allyProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex"
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  tabPanel: {
    width: "100%"
  }
}))

export default function VerticalTabs() {
  const classes = useStyles()
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <Paper elevation={2}>
        <Tabs
          orientation={"vertical"}
          variant={"scrollable"}
          value={value}
          onChange={handleChange}
          aria-label={"vertical tabs"}
          className={classes.tabs}
        >
          <Tab label={"Social Post"} {...allyProps(0)}/>
          <Tab label={"Form Two"} {...allyProps(1)}/>
        </Tabs>
      </Paper>
      <TabPanel index={0} value={value}>
        <SocialPostForm/>
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Typography>Form Two</Typography>
      </TabPanel>
    </div>
  )
}

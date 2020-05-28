import React, { useState } from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role={"tabpanel"}
      hidden={value !== index}
      id={"vertical-tabpanel-${index}"}
      aria-labelledby={"vertical-tab-${index}"}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
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
    id: "vertical-tab-${index}",
    "aria-controls": "vertical-tabpanel-${index}"
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 224
  },
  tabs: {
    borderRight: "1px solid ${theme.palette.divider}"
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
      <Tabs
        orientation={"vertical"}
        variant={"scrollable"}
        value={"value"}
        onChange={handleChange}
        aria-label={"vertical tabs"}
        className={classes.tabs}
      >
        <Tab label={"Social Post"} {...allyProps(0)}/>
        <Tab label={"Item Two"} {...allyProps(1)}/>
      </Tabs>
      <TabPanel index={0} value={value}>
        Social Post Form
      </TabPanel>
      <TabPanel index={1} value={value}>
        Item Two
      </TabPanel>
    </div>
  )
}

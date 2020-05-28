import React, { useState } from "react"
import { makeStyles, ThemeProvider } from "@material-ui/core/styles"
import siteTheme from "../../theme"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: siteTheme.palette.primary.main,
    color: siteTheme.palette.secondary.contrastText,
    marginLeft: "0%",
    marginRight: "0%"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center"
  }
}))

export default function SocialPostForm() {
  const classes = useStyles()

  function handleSubmit() {

  }

  return (
    <ThemeProvider theme={siteTheme}>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs/>
          <Grid item xs={10} md={8}>
            <div>
              <form onSubmit={handleSubmit}>
                <Typography align={"center"} variant={"h4"} gutterBottom={true}>SOCIAL POST</Typography>
                <TextField id="generated-password" fullWidth
                           size={"medium"}
                           color={"secondary"}
                           label={"Post Title"}/>
                <TextField id="generated-password" fullWidth
                           size={"medium"}
                           color={"secondary"}
                           label={"Primary Reference URL"}
                           type={"url"}/>
                <TextField id="generated-password" fullWidth
                           size={"medium"}
                           color={"secondary"}
                           label={"Hash Tags"}/>
                <TextField id="generated-password" fullWidth
                           size={"medium"}
                           color={"secondary"}
                           label={"Associated Twitter Influencer"}/>
                <TextField id="generated-password" fullWidth
                           size={"medium"}
                           color={"secondary"}
                           label={"Social Post (Shortened)"}/>
                <TextField id="generated-password" fullWidth
                           size={"medium"}
                           color={"secondary"}
                           label={"Social Post"}
                           multiline={true}/>
                <TextField id="generated-password" fullWidth
                           size={"medium"}
                           color={"secondary"}
                           label={"BackLinks"}
                           type={"number"}/>
              </form>
            </div>
          </Grid>
          <Grid item xs/>
        </Grid>
      </div>
    </ThemeProvider>
  )
}

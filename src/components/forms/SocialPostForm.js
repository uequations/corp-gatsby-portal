import React, { useState } from "react"
import { makeStyles, ThemeProvider } from "@material-ui/core/styles"
import siteTheme from "../../theme"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: siteTheme.palette.primary.main,
    color: siteTheme.palette.secondary.contrastText,
    marginLeft: "0%",
    marginRight: "0%",
    display: "flex",
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(10)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  textField: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2)
  }
}))

export default function SocialPostForm() {
  const classes = useStyles()

  const [submissionStatus, setSubmissionStatus] = useState({ submissionStatus: "" })

  function handleSubmit(ev) {
    ev.preventDefault()
    const form = ev.target
    const data = new FormData(form)
    const xhr = new XMLHttpRequest()
    xhr.open(form.method, process.env.GATSBY_SOCIAL_POST_ACTION_URL, true)
    xhr.setRequestHeader("Accept", "application/x-www-form-urlencoded")
    xhr.onreadystatechange = () => {
      console.log("submitting form to: ", process.env.GATSBY_SOCIAL_POST_ACTION_URL)
      if (xhr.readyState !== XMLHttpRequest.DONE) return
      if (xhr.status === 200) {
        form.reset()
        setSubmissionStatus({ submissionStatus: "SUCCESS" })
      } else {
        console.log("status: ", xhr.status)
        setSubmissionStatus({ submissionStatus: "ERROR" })
      }
    }
    xhr.send(data)
  }

  return (
    <ThemeProvider theme={siteTheme}>
      <Container className={classes.root} component={"section"}>
        <Grid container spacing={2}>
          <Grid item xs/>
          <Grid item xs={10} md={8}>
            <div>
              <form encType={"application/x-www-form-urlencoded"} method={"POST"} onSubmit={handleSubmit}>
                <Typography align={"center"} variant={"h4"} gutterBottom={true}>SOCIAL POST</Typography>
                <TextField fullWidth
                           size={"medium"}
                           color={"secondary"}
                           label={"Post Title"}
                           className={classes.textField}
                           name={"post_title"}
                />
                <TextField fullWidth
                           size={"medium"}
                           color={"secondary"}
                           label={"Primary Reference URL"}
                           type={"url"}
                           name={"primary_reference_url"}
                           className={classes.textField}/>
                <TextField fullWidth
                           size={"medium"}
                           color={"secondary"}
                           label={"Hash Tags"}
                           name={"hash_tags"}
                           required={true}
                           className={classes.textField}/>
                <TextField fullWidth
                           size={"medium"}
                           color={"secondary"}
                           label={"Associated Twitter Influencer"}
                           name={"associated_twitter_influencer"}
                           className={classes.textField}/>
                <TextField fullWidth
                           size={"medium"}
                           color={"secondary"}
                           label={"Social Post (Shortened)"}
                           name={"social_post_shortened"}
                           className={classes.textField}/>
                <TextField fullWidth
                           size={"medium"}
                           color={"secondary"}
                           label={"Social Post"}
                           name={"social_post"}
                           multiline={true}
                           className={classes.textField}/>
                <TextField fullWidth
                           size={"medium"}
                           color={"secondary"}
                           label={"BackLinks"}
                           type={"number"}
                           defaultValue={0}
                           name={"backlinks"}
                           className={classes.textField}
                           inputProps={{
                             "min": 0
                           }}/>
                <br/>
                <br/>
                <Button type={"submit"} variant={"contained"} color={"secondary"} fullWidth={true}>SUBMIT</Button>
              </form>
            </div>
          </Grid>
          <Grid item xs/>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

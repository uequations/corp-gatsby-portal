import React, { useState } from "react"
import { makeStyles, ThemeProvider } from "@material-ui/core/styles"
import siteTheme from "../../theme"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import { useForm } from "react-hook-form"

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
  },
  form: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}))

export default function SocialPostForm() {
  const classes = useStyles()

  const [submissionStatus, setSubmissionStatus] = useState({ submissionStatus: "" })

  const { register, handleSubmit, errors } = useForm()

  const onSubmit = data => {
    postFormData(data)
      .then(response => {
          console.log("API response: ", response)
          console.log("response status: ", response.status)
          setSubmissionStatus({ submissionStatus: "SUCCESS" })
        }
      )
      .catch((error) => {
        console.error("API error: ", error)
        setSubmissionStatus({ submissionStatus: "ERROR" })
      })
  }

  async function postFormData(data) {

    const url = "https://ueq-functions.netlify.app/.netlify/functions/social-post"

    console.log("posting data: ", JSON.stringify(data))

    const responseOptions = {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data)
    }

    return await fetch(url, responseOptions)
  }

  return (
    <ThemeProvider theme={siteTheme}>
      <Container className={classes.root} component={"section"}>
        <Grid container spacing={2} className={classes.form}>
          <Grid item xs/>
          <Grid item xs={10} md={8}>
            <div>
              <form method={"POST"} onSubmit={handleSubmit(onSubmit)}>
                <Typography align={"center"} variant={"h4"} gutterBottom={true}>SOCIAL POST</Typography>
                <TextField fullWidth
                           size={"medium"}
                           color={"secondary"}
                           label={"Post Title"}
                           className={classes.textField}
                           name={"post_title"}
                           inputRef={register}
                />
                <TextField fullWidth
                           size={"medium"}
                           color={"secondary"}
                           label={"Primary Reference URL"}
                           type={"url"}
                           name={"primary_reference_url"}
                           className={classes.textField}
                           inputRef={register}
                />
                <TextField fullWidth
                           size={"medium"}
                           color={"secondary"}
                           label={"Hash Tags"}
                           name={"hash_tags"}
                           required={true}
                           inputRef={register}
                           className={classes.textField}
                           inputRef={register}
                />
                <TextField fullWidth
                           size={"medium"}
                           color={"secondary"}
                           label={"Associated Twitter Influencer"}
                           name={"associated_twitter_influencer"}
                           className={classes.textField}
                           inputRef={register}
                />
                <TextField fullWidth
                           size={"medium"}
                           color={"secondary"}
                           label={"Social Post (Shortened)"}
                           name={"social_post_shortened"}
                           className={classes.textField}
                           inputRef={register}
                />
                <TextField fullWidth
                           size={"medium"}
                           color={"secondary"}
                           label={"Social Post"}
                           name={"social_post"}
                           multiline={true}
                           className={classes.textField}
                           inputRef={register}
                />
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
                           }}
                           inputRef={register}
                />
                {errors.hash_tags && <span>This field is required</span>}
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

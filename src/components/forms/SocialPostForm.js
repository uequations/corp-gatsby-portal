import React, { useEffect, useRef, useState } from "react"
import { makeStyles, ThemeProvider } from "@material-ui/core/styles"
import siteTheme from "../../theme"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"
import { useForm } from "react-hook-form"
import Snackbar from "@material-ui/core/Snackbar"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import FormSubmissionDialog from "./FormSubmissionDialog"

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
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center"
  }
}))

export default function SocialPostForm() {
  const classes = useStyles()

  const timer = React.useRef()
  const [submissionStatus, setSubmissionStatus] = useState({ submissionStatus: "" })
  const { register, handleSubmit, errors, reset } = useForm()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const defaultSubmissionMessage = {
    line1: "", //social post
    line2: "", // keywords
    line3: "-",
    line4: "", // post title
    line5: "" // primary reference url
  }

  const [submissionMessage, setSubmissionMessage] = useState(defaultSubmissionMessage)

  useEffect(() => {
    return () => {
      clearTimeout(timer.current)
    }
  }, [])

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setSnackbarOpen(false)
  }

  const onSubmitForm = (data, event) => {

    if (!loading) {
      setSuccess(false)
      setLoading(true)
    }

    openDialog(data)
      .then((data) =>
        postFormData(data))
      .then((response) =>
        handleResponse(response))
      .catch((error) => {
        console.error("API error: ", error)
        setSubmissionStatus({ submissionStatus: "ERROR" })
        setSuccess(false)
        setLoading(false)
      })
  }

  async function handleResponse(response) {
    setLoading(false)

    console.log("response status", response.status)
    setSubmissionStatus({ submissionStatus: "SUCCESS" })
    setSnackbarOpen(true)

    setSuccess(true)

    return Promise.resolve(response)
  }

  async function openDialog(data) {

    const submissionMessage = {
      line1: data.hash_tags,
      line2: data.social_post,
      line3: "-",
      line4: data.post_title,
      line5: data.primary_reference_url
    }

    setSubmissionMessage(submissionMessage)

    setDialogOpen(true)
    console.log(submissionMessage)

    return Promise.resolve(data)
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

  const handleCloseDialog = () => {
    console.log("closing dialog")
    setDialogOpen(false)
    reset()

  }

  return (
    <ThemeProvider theme={siteTheme}>
      <Container className={classes.root} component={"section"}>
        <Grid container spacing={2} className={classes.form}>
          <Grid item xs/>
          <Grid item xs={10} md={8}>
            <div>
              <form method={"POST"} onSubmit={handleSubmit(onSubmitForm)}>
                <Typography align={"center"} variant={"h4"} gutterBottom={true}>SOCIAL POST</Typography>
                <TextField fullWidth
                           size={"medium"}
                           color={"secondary"}
                           label={"Post Title"}
                           className={classes.textField}
                           name={"post_title"}
                           inputRef={register}
                           inputProps={{ spellCheck: true }}
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
                           label={"Keywords"}
                           name={"hash_tags"}
                           required={true}
                           inputRef={register}
                           className={classes.textField}
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
                           inputProps={{ maxLength: 95, spellCheck: true }}
                           inputRef={register}
                           spellCheck={true}
                />
                <TextField fullWidth
                           size={"medium"}
                           color={"secondary"}
                           label={"Social Post"}
                           name={"social_post"}
                           multiline={true}
                           className={classes.textField}
                           inputRef={register}
                           inputProps={{ spellCheck: true }}
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
                <ButtonGroup className={classes.buttonGroup}>
                  <Button disabled={loading} type={"submit"} variant={"contained"}
                          color={"secondary"} fullWidth={true}>SUBMIT</Button>
                  <Button type={"reset"} variant={"contained"} color={"secondary"} fullWidth={true}
                          onClick={reset}>RESET</Button>
                </ButtonGroup>
                <Snackbar
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                  }}
                  open={snackbarOpen}
                  autoHideDuration={5500}
                  onClose={handleSnackbarClose}
                  message={"SUBMITTED & SAVED"}
                />
                <FormSubmissionDialog handleCloseDialog={handleCloseDialog} dialogOpen={dialogOpen}
                                      submissionMessage={submissionMessage}/>
              </form>
            </div>
          </Grid>
          <Grid item xs/>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

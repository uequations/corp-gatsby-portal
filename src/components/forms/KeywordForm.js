import React, { useEffect, useRef, useState } from "react"
import { ThemeProvider } from "@material-ui/core/styles"
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
import formStyles from "./FormStyle"
import { postFormData } from "./FormFunction"
import FormControl from "@material-ui/core/FormControl"
import FormLabel from "@material-ui/core/FormLabel"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import { formConfig } from "../../config/form_config"

export default function KeywordForm() {

  const formStyleClass = formStyles()

  const defaultSubmissionMessage = {
    line1: "", //keywords
    line2: "community", // keyword_type
    line3: "", //
    line4: 2, // popularity_score
    line5: 1 // keyword count
  }

  const defaultFormValues = {
    keyword_type: "community",
    keywords: "",
    popularity_score: 2,
    keywordCount: 1
  }

  useEffect(() => {
    register({ name: "keyword_type" })

    return () => unregister(["keyword_type"])
  }, [register, unregister])

  const [formValues, setFormValues] = useState(defaultFormValues)

  const handleRadioGroupChange = (event, value) => {
    console.log("handling radio group change", value)
    setFormValues({ keyword_type: value })
    setValue("keyword_type", value)
  }

  const timer = React.useRef()
  const { register, handleSubmit, errors, reset, setValue, unregister } = useForm({ defaultValues: defaultFormValues })
  const [submissionStatus, setSubmissionStatus] = useState({ submissionStatus: "" })
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [submissionMessage, setSubmissionMessage] = useState(defaultSubmissionMessage)
  const actionURL = formConfig.config.keywordFormActionURL

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

    event.preventDefault()

    if (!loading) {
      setSuccess(false)
      setLoading(true)
    }

    openDialog(data)
      .then((data) =>
        postFormData(data, actionURL))
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
    console.log("response status", response)
    setSubmissionStatus({ submissionStatus: "SUCCESS" })
    setSnackbarOpen(true)
    setSuccess(true)

    return Promise.resolve(response)
  }

  async function openDialog(data) {

    const submissionMessage = {
      line1: "keywords: ".concat(data.keywords),
      line2: "popularity score: ".concat(data.popularity_score),
      line4: "keyword count: ".concat(data.keyword_count),
      line5: "keyword type: ".concat(data.keyword_type)
    }

    setSubmissionMessage(submissionMessage)
    setDialogOpen(true)
    console.log(submissionMessage)

    return Promise.resolve(data)
  }

  const handleCloseDialog = () => {
    console.log("closing dialog")
    setDialogOpen(false)
    reset()
  }


  return (
    <ThemeProvider theme={siteTheme}>
      <Container className={formStyleClass.root} component={"section"}>
        <Grid container spacing={2} className={formStyleClass.form}>
          <Grid item xs/>
          <Grid item xs={10} md={8}>
            <div>
              <form onSubmit={handleSubmit(onSubmitForm)}>
                <Typography align={"center"} variant={"h4"} gutterBottom={true}>KEYWORD</Typography>
                <TextField fullWidth
                           size={"medium"}
                           color={"secondary"}
                           label={"Keywords"}
                           className={formStyleClass.textField}
                           name={"keywords"}
                           inputRef={register({ required: true })}
                />
                <FormControl component={"fieldset"} className={formStyleClass.formControl}>
                  <FormLabel component={"legend"}>TYPE</FormLabel>
                  <RadioGroup
                    aria-label={"Type"}
                    name={"keyword_type"}
                    className={formStyleClass.radioGroup}
                    value={formValues.keyword_type}
                    onChange={handleRadioGroupChange}
                  >
                    <FormControlLabel value={"community"} control={<Radio/>} label={"community"}/>
                    <FormControlLabel value={"tech"} control={<Radio/>} label={"tech"}/>
                  </RadioGroup>
                </FormControl>
                <TextField fullWidth
                           size={"medium"}
                           color={"secondary"}
                           label={"Popularity Score"}
                           name={"popularity_score"}
                           className={formStyleClass.textField}
                           inputRef={register}
                           type="number"
                           InputLabelProps={{
                             shrink: true
                           }}
                           defaultValue={2}
                />
                <TextField fullWidth
                           size={"medium"}
                           color={"secondary"}
                           label={"Keyword Count"}
                           name={"keyword_count"}
                           inputRef={register}
                           className={formStyleClass.textField}
                           type="number"
                           InputLabelProps={{
                             shrink: true
                           }}
                           defaultValue={1}
                />
                {errors.keywords && <span>This field is required</span>}
                <ButtonGroup className={formStyleClass.buttonGroup}>
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

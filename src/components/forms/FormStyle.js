import siteTheme from "../../theme"
import { makeStyles } from "@material-ui/core/styles"

const formStyles = makeStyles((theme) => ({
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
  },
  formControl: {
    margin: theme.spacing(3)
  },
  radioGroup: {
    margin: theme.spacing(0)
  },
  formLabelLegend: {}
}))

export default formStyles

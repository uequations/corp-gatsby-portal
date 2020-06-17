import React from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import PropTypes from "prop-types"

export default function FormSubmissionDialog(props) {

  console.log("FormSubmissionDialog", JSON.stringify(props))

  return (
    <div>
      <Dialog
        open={props.dialogOpen}
        onClose={props.handleCloseDialog}
        aria-labelledby={"alert-dialog-title"}
        aria-describedby={"alert-dialog-description"}
      >
        <DialogTitle id="alert-dialog-title">{"FORM SUBMITTED"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.submissionMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCloseDialog} color="primary">
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

FormSubmissionDialog.propTypes = {
  dialogOpen: PropTypes.bool.isRequired,
  submissionMessage: PropTypes.string,
  handleCloseDialog: PropTypes.func
}

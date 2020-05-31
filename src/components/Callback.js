import Skeleton from "@material-ui/lab/Skeleton"
import React from "react"


export default function Callback() {
  return (
    <div>
      <Skeleton variant={"text"}/>
      <Skeleton variant="circle" width={175} height={175}/>
      <Skeleton variant="rect" height={500}/>
    </div>
  )
}

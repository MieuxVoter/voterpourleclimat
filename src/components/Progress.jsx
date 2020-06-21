import React from "react"
import { Responsive, Progress } from "semantic-ui-react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const ProgressBar = ({ value }) => (
  <>
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        background
        backgroundPadding={6}
        styles={buildStyles({
          backgroundColor: "#03B37F",
          textColor: "#fff",
          pathColor: "#fff",
          trailColor: "transparent",
        })}
      />
    </Responsive>

    <Responsive {...Responsive.onlyMobile}>
      <Progress value={value} total="5" indicating progress="percent" />
    </Responsive>
  </>
)

export default ProgressBar

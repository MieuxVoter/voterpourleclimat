import React from "react"
import { Responsive, Progress } from "semantic-ui-react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const ProgressBar = ({ value }) => {
  const progress = Math.max(value, 1)

  return (
    <>
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <div style={{ maxWidth: "100px", fontWeight: "bold" }}>
          <CircularProgressbar
            value={progress}
            text={`${progress}%`}
            background
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor: "#03B37F",
              textColor: "#fff",
              pathColor: "#fff",
              maxWidth: "100px",
              trailColor: "transparent",
              fontWeight: "bold",
            })}
          />
        </div>
      </Responsive>

      <Responsive {...Responsive.onlyMobile}>
        <Progress value={value} total="100" indicating />
      </Responsive>
    </>
  )
}
export default ProgressBar

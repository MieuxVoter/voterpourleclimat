import React from "react"

const Rating = ({ value }) => (
  <span style={{ marginLeft: "1em" }}>
    {[...Array(3).keys()].map(i => {
      let name = ""
      if (i + 1 > value && i < value) {
        name = "half"
      } else if (i >= value) {
        name = "outline"
        console.log("FOO")
      }

      console.log(i, value)
      return <i key={i} className={`teal star ${name} icon`} />
    })}
  </span>
)

export default Rating

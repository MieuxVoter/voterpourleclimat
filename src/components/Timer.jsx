import React, { useState } from "react"
import { Segment, Image, Grid, Label, Icon } from "semantic-ui-react"
import styled from "styled-components"
import timeLeft from "../assets/images/time-left.png"

const twoDigits = number => number.toString().padStart(2, "0")

const Em = styled.span`
  text-transform: uppercase;
  font-weight: bolder;
  font-size: 1.3em;
`
const Big = styled.p`
  font-size: 1.4em;
`
export const CountDown = () => {
  const [time, setTime] = useState(new Date())
  const end = new Date(1594684799000)
  const remaining = new Date(end - time)
  setTimeout(() => setTime(new Date()), 1000)

  return (
    <>
      <Big>
        <Em>{twoDigits(remaining.getDate())}</Em> jours
      </Big>
      <Big>
        <Em>{twoDigits(remaining.getHours())}</Em>:
        <Em>{twoDigits(remaining.getMinutes())}</Em>:
        <Em>{twoDigits(remaining.getSeconds())}</Em> restants
      </Big>
    </>
  )
}

const Timer = () => {
  return (
    <Segment inverted vertical>
      <Grid columns="equal" stackable>
        <Grid.Row>
          <Grid.Column textAlign="right">
            <Big>Fin de la consultation</Big>
            <Big>
              Le <Em>13 juillet</Em> à <Em>minuit</Em>.
            </Big>
          </Grid.Column>
          <Grid.Column width={2}>
            <Image src={timeLeft} size="tiny" centered className="teal" />
          </Grid.Column>
          <Grid.Column width={7}>
            <CountDown />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

export default Timer

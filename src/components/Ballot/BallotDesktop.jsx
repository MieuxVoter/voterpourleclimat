import React, { useState } from "react"
import { Segment, Grid, Button, Icon } from "semantic-ui-react"
import ModalInfo from "./ModalInfo"

const BallotDesktop = ({ grades, votes, onClick, handleSubmit, valid }) => {
  const [state, setState] = useState({ modal: false })

  const closeModal = () => {
    setState({ modal: false })
  }

  const openModal = vote => {
    setState({ modal: true, title: vote.proposal })
  }

  return (
    <Segment>
      <ModalInfo open={state.modal} close={closeModal} title={state.title} />
      <Grid container className="ui padded" stackable verticalAlign="middle">
        {votes.map((vote, index) => (
          <Grid.Row key={index}>
            <Grid.Column width={1} className="center aligned">
              <Icon
                inverted
                circular
                className="teal"
                name="question"
                onClick={() => openModal(vote)}
              />
            </Grid.Column>
            <Grid.Column width={5} className="right aligned">
              {vote.proposal}
            </Grid.Column>
            <Grid.Column fluid width={10}>
              <Button.Group fluid>
                {grades.map((grade, gradeId) => {
                  let className = "ui button"
                  if (vote.vote === null) {
                    className = `ui button`
                  } else if (vote.vote === grade.value) {
                    className = `ui button active ${grade.color}`
                  }
                  let or = null
                  if (gradeId !== grades.length - 1) {
                    or = <div class="or"></div>
                  }

                  return (
                    <React.Fragment key={gradeId}>
                      <button
                        data-proposal-id={index}
                        data-grade-value={grade.value}
                        onClick={onClick}
                        className={className}
                      >
                        {grade.name}
                      </button>
                      {or}
                    </React.Fragment>
                  )
                })}
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
        ))}
        <br />
      </Grid>
      <Grid container className="ui padded" stackable verticalAlign="middle">
        <Grid.Column width={6}></Grid.Column>
        <Grid.Column width={10} onClick={handleSubmit}>
          <Button className={`fluid ${valid ? "primary" : "disabled"}`}>
            Valider
          </Button>
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

export default BallotDesktop

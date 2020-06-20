import React, { useState } from "react"
import { Icon, Card, Button, Label, Grid } from "semantic-ui-react"
import ModalInfo from "./ModalInfo"

const displayGrade = (
  vote,
  voteId,
  grade,
  gradeId,
  onClick,
  isLast = false
) => {
  let className = ""
  if (vote.vote === null) {
    className = ""
  } else if (vote.vote === grade.value) {
    className = `active ${grade.color}`
  }

  let or = null
  if (!isLast) {
    or = <div class="or"></div>
  }

  const btn = (
    <React.Fragment key={gradeId}>
      <Button
        data-proposal-id={voteId}
        data-grade-value={grade.value}
        onClick={onClick}
        className={className}
      >
        {grade.name}
      </Button>
      {or}
    </React.Fragment>
  )
  return btn
}

const BallotMobile = ({ grades, votes, onClick, handleSubmit, valid }) => {
  const [state, setState] = useState({ modal: false })

  const closeModal = () => {
    setState({ modal: false })
  }

  const openModal = vote => {
    setState({ modal: true, title: vote.proposal })
  }

  return (
    <Grid
      container
      padded
      className="ui padded"
      verticalAlign="middle"
    >
      <ModalInfo open={state.modal} close={closeModal} title={state.title} />
      <Grid.Row>
        <Grid.Column>
          <Card.Group>
            {votes.map((vote, index) => (
              <Card fluid key={index}>
                <Card.Content>
                  <Card.Description>
                    <Card.Header>
                      {vote.proposal}
                    </Card.Header>
                    <Button
                      onClick={() => openModal(vote)}
                      className="teal"
                      size="small"
                      style={{ marginTop: "1em"}}
                    >
                    En savoir plus sur la mesure
                    </Button>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Button.Group className="attached mini top two">
                    {grades.map((grade, gradeId) => {
                      if (gradeId >= 2) return
                      return displayGrade(
                        vote,
                        index,
                        grade,
                        gradeId,
                        onClick,
                        gradeId === 1
                      )
                    })}
                  </Button.Group>
                  <Button.Group className="attached mini bottom two">
                    {grades.map((grade, gradeId) => {
                      if (gradeId < 2 || gradeId >= 4) return
                      return displayGrade(
                        vote,
                        index,
                        grade,
                        gradeId,
                        onClick,
                        gradeId === 3
                      )
                    })}
                  </Button.Group>
                  <Button.Group className="attached mini bottom two">
                    {grades.map((grade, gradeId) => {
                      if (gradeId < 4) return
                      return displayGrade(
                        vote,
                        index,
                        grade,
                        gradeId,
                        onClick,
                        gradeId === 5
                      )
                    })}
                  </Button.Group>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Button
          className={valid ? "primary" : "disabled"}
          fluid
          onClick={handleSubmit}
        >
          Valider
        </Button>
      </Grid.Row>
    </Grid>
  )
}

export default BallotMobile

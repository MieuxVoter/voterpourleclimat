import React from "react"
import { Card, Segment, Button, Grid } from "semantic-ui-react"

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
  return (
    <Grid
      container
      padded
      className="ui padded"
      stackable
      verticalAlign="middle"
    >
      <Grid.Row>
        <Card.Group>
          {votes.map((vote, index) => (
            <Card fluid key={index}>
              <Card.Content>
                <Card.Description>
                  <Card.Header>{vote.proposal} </Card.Header>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button.Group className="attached mini top three">
                  {grades.map((grade, gradeId) => {
                    if (gradeId > 2) return
                    return displayGrade(
                      vote,
                      index,
                      grade,
                      gradeId,
                      onClick,
                      gradeId === 2
                    )
                  })}
                </Button.Group>
                <Button.Group className="attached mini bottom three">
                  {grades.map((grade, gradeId) => {
                    if (gradeId < 3) return
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
      </Grid.Row>
      <Grid.Row>
        <Button
          className={valid ? "" : "disabled"}
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

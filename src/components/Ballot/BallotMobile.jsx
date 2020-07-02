import React from "react"
import { Grid, Button, Card } from "semantic-ui-react"
import Rating from "../Rating"

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
    or = <div className="or"></div>
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

const BallotMobile = ({ grades, votes, onClick, handleSubmit, valid }) => (
  <Grid container padded className="ui padded" verticalAlign="middle">
    <Grid.Row>
      <Grid.Column>
        <Card.Group>
          {votes.map((vote, index) => (
            <Card fluid key={index}>
              <Card.Content>
                <Button.Group className="two">
                  <Button
                    style={{ padding: "10px" }}
                    className="ui basic teal button"
                  >
                    <span>Impact</span>
                    <Rating value={vote.objective.ges} />
                  </Button>
                  <Button
                    as="a"
                    href={vote.objective.url}
                    target="_blank"
                    className="ui basic teal button"
                    style={{ padding: "10px", margin: "0" }}
                  >
                    Plus d'infos
                  </Button>
                </Button.Group>
              </Card.Content>
              <Card.Content extra>
                <Card.Meta>
                  {vote.objective.label}
                  {".  "}
                </Card.Meta>
                <Card.Description style={{ fontWeight: "bold" }}>
                  {vote.proposal}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button.Group className="attached mini top two">
                  {grades.map((grade, gradeId) => {
                    if (gradeId >= 2) return null
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
                    if (gradeId < 2 || gradeId >= 4) return null
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
                    if (gradeId < 4) return null
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

export default BallotMobile

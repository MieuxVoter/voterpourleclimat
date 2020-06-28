import React from "react"
import { Label, Grid, Button, Card } from "semantic-ui-react"
import Rating from "../Rating"

const BallotDesktop = ({ grades, votes, onClick, handleSubmit, valid }) => {
  return (
    <>
      <Grid container className="ui padded" stackable verticalAlign="middle">
        <Card.Group>
          {votes.map((vote, index) => (
            <Card fluid key={index}>
              <Card.Content>
                <Card.Header style={{ marginBottom: "1em" }}>
                  <Grid>
                    <Grid.Column width={8}>
                      {vote.objective.ges && vote.objective.ges >= 1 ? (
                        <Label className="basic teal" ribbon>
                          <span
                            style={{ fontsize: "1.3em", fontweight: "normal" }}
                          >
                            Impact gaz à effet de serre
                          </span>

                          <Rating value={vote.objective.ges} />
                        </Label>
                      ) : null}
                    </Grid.Column>
                  </Grid>
                </Card.Header>
                <Card.Meta>
                  {vote.objective.label}
                  {".  "}
                  <a
                    href={vote.objective.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#03B37F" }}
                  >
                    En savoir plus sur l'objectif.
                  </a>
                </Card.Meta>
                <Card.Description style={{ fontWeight: "bold" }}>
                  {vote.proposal}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Grid.Row key={2 * index}>
                  <Grid.Column width={16}>
                    <Button.Group fluid className="six">
                      {grades.map((grade, gradeId) => {
                        let className = "ui button"
                        if (vote.vote === null) {
                          className = `ui button`
                        } else if (vote.vote === grade.value) {
                          className = `ui button active ${grade.color}`
                        }
                        let or = null
                        if (gradeId !== grades.length - 1) {
                          or = <div className="or"></div>
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
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
        <br />
      </Grid>
      <Grid container className="ui padded" stackable verticalAlign="middle">
        <Grid.Column width={16} onClick={handleSubmit}>
          <Button className={`fluid ${valid ? "primary" : "disabled"}`}>
            Valider
          </Button>
        </Grid.Column>
      </Grid>
    </>
  )
}

export default BallotDesktop

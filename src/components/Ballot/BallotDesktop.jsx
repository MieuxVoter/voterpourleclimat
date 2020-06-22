import React, { useState } from "react"
import { Segment, Label, Rating, Grid, Button, Card } from "semantic-ui-react"
import ModalInfo from "./ModalInfo"

const BallotDesktop = ({ grades, votes, onClick, handleSubmit, valid }) => {
  return (
    <>
      <Grid container className="ui padded" stackable verticalAlign="middle">
        <Card.Group>
          {votes.map((vote, index) => (
            <Card fluid>
              <Card.Content>
                <Card.Header style={{ marginBottom: "1em" }}>
                  <Grid>
                    <Grid.Column width={8}>
                      {vote.objective.ges && vote.objective.ges > 1 ? (
                        <Label color="basic teal" ribbon>
                          <span style={{ fontSize: "1.3em" }}>
                            Impact gaz à effet de serre
                          </span>

                          <Rating
                            icon="star"
                            defaultRating={vote.objective.ges}
                            maxRating={3}
                            style={{ marginLeft: "1em", color: "white" }}
                          />
                        </Label>
                      ) : null}
                    </Grid.Column>
                    <Grid.Column textAlign="right" width={8}>
                      <Button
                        href={vote.objective.url}
                        target="_blank"
                        className="basic teal"
                        size="medium"
                        as="a"
                      >
                        En savoir plus sur la mesure
                      </Button>
                    </Grid.Column>
                  </Grid>
                </Card.Header>
                <Card.Meta>{vote.objective.label}</Card.Meta>
                <Card.Description>{vote.proposal}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Grid.Row key={2 * index}>
                  <Grid.Column fluid width={16}>
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

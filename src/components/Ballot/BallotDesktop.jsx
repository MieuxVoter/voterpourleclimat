import React from "react"
import { Segment, Grid, Button } from "semantic-ui-react"
import "./index.css"

const BallotDesktop = ({ grades, votes, onClick, handleSubmit, valid }) => {
  return (
    <Segment>
      <Grid container className="ui padded" stackable verticalAlign="middle">
        {votes.map((vote, index) => (
          <Grid.Row key={index}>
            <Grid.Column width={6} className="ui right aligned">
              {vote.proposal}
            </Grid.Column>
            <Grid.Column width={10}>
              <div className="ui buttons">
                {grades.map((grade, gradeId) => {
                  let className = "ui large button"
                  if (vote.vote === null) {
                    className = `ui button large`
                  } else if (vote.vote === grade.value) {
                    className = `ui button large active ${grade.color}`
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
              </div>
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

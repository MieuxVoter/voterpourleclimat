import React, { useState } from "react"
import { Segment, Grid, Button, Icon, Label } from "semantic-ui-react"
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
          <>
          <Grid.Row key={2*index + 1} style={
            { borderTop: index == 0 ? "" : "1px solid lightgray" }}>
          <Grid.Column width={13} className="left aligned">
            <p>{ vote.proposal }</p>
            <p style={{
              color: "#03b37f",
              textTransform: "uppercase",
              fontWeight: 600,
              fontSize: "small"
            }}><b>Objectif : </b> { vote.objective.label } </p>
          </Grid.Column>
          <Grid.Column width={3}>
            <Button href={ vote.objective.url } target="_blank"
              className="teal"
              size="mini"
              as="a"
            >
              En savoir plus sur la mesure
            </Button>
          </Grid.Column>
          </Grid.Row>

          <Grid.Row key={2*index}>
            <Grid.Column fluid width={16}>
              <div className="ui fluid buttons">
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
              </div>
            </Grid.Column>
          </Grid.Row>
          </>
        ))}
        <br />
      </Grid>
      <Grid container className="ui padded" stackable verticalAlign="middle">
        <Grid.Column width={16} onClick={handleSubmit}>
          <Button className={`fluid ${valid ? "primary" : "disabled"}`}>
            Valider
          </Button>
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

export default BallotDesktop

import React from "react"
import PropTypes from "prop-types"
import { toast, ToastContainer } from "react-toastify"
import { Segment, Grid, Header, Responsive } from "semantic-ui-react"
import * as CONSTANTS from "../constants"
import { castVote, loadVote } from "../services/actions"
import { UserContext } from "../services/User"

const BallotMobile = ({ grades, votes, onClick, handleSubmit, valid }) => {
  return (
    <>
      {Object.keys(votes).map((proposal, index) => (
        <Segment>
          <Grid.Row>
            <label htmlFor={`proposal-${index}`}>{proposal}</label>
          </Grid.Row>
          <hr />
          {grades.map((grade, gradeId) => (
            <Grid.Row>
              <Grid.Column key={gradeId} width={2}>
                <input
                  type="radio"
                  name={`proposal-${index}`}
                  id={`grade-${index}-${gradeId}`}
                  value={gradeId}
                  onClick={onClick}
                  defaultChecked={votes[proposal] === gradeId}
                />
              </Grid.Column>

              <Grid.Column key={gradeId} width={2}>
                <label htmlFor={`proposal-${index}`}>{grade}</label>
              </Grid.Column>
            </Grid.Row>
          ))}
        </Segment>
      ))}
      <hr />

      <button
        type="button"
        className={valid ? "ui button" : "ui button disabled"}
        onClick={handleSubmit}
      >
        Valider
      </button>
    </>
  )
}

const BallotDesktop = ({ grades, votes, onClick, handleSubmit, valid }) => {
  return (
    <Segment>
      <Grid container className="ui padded" stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={5}> </Grid.Column>
          {grades.map((grade, gradeId) => (
            <Grid.Column
              key={gradeId}
              width={2}
              className={`ui center aligned label ${grade.color}`}
            >
              {grade.name}
            </Grid.Column>
          ))}
        </Grid.Row>

        {votes.map((vote, index) => (
          <Grid.Row key={index}>
            <Grid.Column width={5} className="ui right aligned">
              {vote.proposal}
            </Grid.Column>
            {grades.map((grade, gradeId) => (
              <Grid.Column
                key={gradeId}
                width={2}
                data-proposal-id={index}
                data-grade-value={grade.value}
                className={`ui button ${
                  vote.vote === grade.value ? "primary" : null
                }`}
                onClick={onClick}
              />
            ))}
          </Grid.Row>
        ))}
        <br />
      </Grid>
      <Grid container className="ui padded" stackable verticalAlign="middle">
        <Grid.Column width={5}></Grid.Column>
        <Grid.Column
          width={10}
          className={`ui button ${valid ? null : "disabled"}`}
          onClick={handleSubmit}
        >
          Valider
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

class Vote extends React.Component {
  static contextType = UserContext

  static propTypes = {
    title: PropTypes.string.isRequired,
    proposals: PropTypes.array.isRequired,
    collectionName: PropTypes.string.isRequired,
    numGrades: PropTypes.number,
    grades: PropTypes.array,
    user: PropTypes.any,
  }

  static defaultProps = {
    numGrades: 5,
    grades: CONSTANTS.grades,
  }

  constructor(props) {
    super(props)
    console.log(this.props.user)
    const votes = []
    for (let proposalId in props.proposals) {
      votes[proposalId] = { vote: null, proposal: props.proposals[proposalId] }
    }
    this.state = { votes: votes }
  }

  handleGradeClick = event => {
    const proposalId = parseInt(
      event.currentTarget.getAttribute("data-proposal-id")
    )
    const value = parseInt(event.currentTarget.getAttribute("data-grade-value"))
    const votes = [...this.state.votes]
    votes[proposalId].vote = value
    this.setState({ votes: votes })
  }

  handleSubmit = event => {
    event.preventDefault()
    if (!this.check()) {
      toast.error("Vous devez voter pour toutes les mesures", {
        position: toast.POSITION.TOP_CENTER,
      })
      return
    }
    if (!this.context.user) {
      toast.error("Une erreur s'est produite... Merci d'essayer plus tard.", {
        position: toast.POSITION.TOP_CENTER,
      })
      return
    }
    console.log("CONTEXT USER", this.context.user.uid)
    castVote(this.state.votes, this.props.collectionName, this.context.user.uid)
  }

  check() {
    /* Check if the ballot is correctly filled */
    for (const vote of this.state.votes) {
      if (vote.vote === null) {
        return false
      }
    }
    return true
  }

  render() {
    const { votes } = this.state
    const { title, grades, hasVoted } = this.props
    const validBallot = this.check()

    return (
      <Segment style={{ padding: "8em 0em" }} vertical>
        <ToastContainer />
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                {title}
              </Header>
              {hasVoted ? (
                <Header as="h5" class="ui header">
                  Vous avez deja vote. Vous pouvez cependant modifier votre vote
                  jusqu'a sa cloture
                </Header>
              ) : (
                ""
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <form
              className="ui form"
              onSubmit={this.handleSubmit}
              autoComplete="off"
            >
              <Responsive {...Responsive.onlyMobile}>
                <BallotMobile
                  grades={grades}
                  votes={votes}
                  onClick={this.handleGradeClick}
                  handleSubmit={this.handleSubmit}
                  valid={validBallot}
                />
              </Responsive>

              <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <BallotDesktop
                  votes={votes}
                  grades={grades}
                  onClick={this.handleGradeClick}
                  handleSubmit={this.handleSubmit}
                  valid={validBallot}
                />
              </Responsive>
            </form>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default Vote

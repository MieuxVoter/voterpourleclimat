import React from "react"
import PropTypes from "prop-types"
import { toast, ToastContainer } from "react-toastify"
import { Segment, Grid, Header, Responsive } from "semantic-ui-react"

const BallotMobile = ({ grades, votes, onClick }) => {
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
    </>
  )
}
const BallotDesktop = ({ grades, votes, onClick }) => {
  return (
    <Segment>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={5}> </Grid.Column>
          {grades.map((grade, gradeId) => (
            <Grid.Column key={gradeId} width={2}>
              <small className="nowrap bold badge">{grade}</small>
            </Grid.Column>
          ))}
        </Grid.Row>

        {Object.keys(votes).map((proposal, index) => (
          <Grid.Row key={index}>
            <Grid.Column width={5}>
              <label htmlFor={`proposal-${index}`}>{proposal}</label>
            </Grid.Column>
            {grades.map((grade, gradeId) => (
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
            ))}
          </Grid.Row>
        ))}
      </Grid>
    </Segment>
  )
}

class Vote extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    proposals: PropTypes.array.isRequired,
    numGrades: PropTypes.number,
    grades: PropTypes.array
  }

  static defaultProps = {
    numGrades: 5,
    grades: ["A rejeter", "Assez bien", "Bien", "Tres bien", "Excellent"]
  }

  constructor(props) {
    super(props)
    const votes = {}
    console.log(props.proposals)
    for (let proposal of props.proposals) {
      votes[proposal] = null
    }
    this.state = { votes: votes }
  }

  handleGradeClick = event => {
    let data = {
      id: parseInt(event.currentTarget.getAttribute("data-id")),
      value: parseInt(event.currentTarget.value)
    }
    //remove candidate
    let ratedCandidates = this.state.ratedCandidates.filter(
      ratedCandidate => ratedCandidate.id !== data.id
    )
    ratedCandidates.push(data)
    this.setState({ ratedCandidates })
  }

  handleSubmitWithoutAllRate = () => {
    const { t } = this.props
    toast.error(t("You have to judge every candidate/proposal!"), {
      position: toast.POSITION.TOP_CENTER
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { ratedCandidates } = this.state
    const electionSlug = this.props.match.params.slug
    const token = this.props.location.search.substr(7)
  }

  render() {
    const { votes } = this.state
    const { title, grades, hasVoted } = this.props
    const validBallot = false

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
                <Header as="h6" style={{ fontSize: "2em" }}>
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
                  onClick={this.handleToggle}
                />
              </Responsive>

              <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <BallotDesktop
                  votes={votes}
                  grades={grades}
                  onClick={this.handleToggle}
                />
              </Responsive>

              <hr />

              <button
                type="button"
                className={validBallot ? "ui button" : "ui button disabled"}
                onClick={this.handleSubmit}
              >
                Valider
              </button>
            </form>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default Vote

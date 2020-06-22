import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { SemanticToastContainer, toast } from "react-semantic-toasts"
import "react-semantic-toasts/styles/react-semantic-alert.css"
import { Segment, Grid, Header, Responsive, Message, Button } from "semantic-ui-react"
import * as CONSTANTS from "../../constants"
import { castVote, loadVote } from "../../services/actions"
import { UserContext } from "../../services/User"
import PersoModal from "./ModalPerso"
import BallotMobile from "./BallotMobile"
import BallotDesktop from "./BallotDesktop"
import Progress from "../Progress"
import "./index.css"

const P = styled.div`
  font-size: 1rem;
  text-align: justify;
  margin: 1em;
`

/**
 * Check if the user gives enough info to be allowed to vote
 */
const canUserVote = user => {
  return user.mail && user.name && user.zipCode && user.age
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
const shuffle = a => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const LoadingMessage = () => {
  return (
    <div class="ui active inverted">
      <div class="ui text loader">Chargement du bulletin de vote</div>
    </div>
  )
}

const MessageDone = () => {
  return (
    <Segment vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Message positive>
            <Message.Header>
              Félicitations ! Vous avez voté pour toutes les propositions de
              cette thématique !
            </Message.Header>
            <p>
              Vous pouvez cependant continuer de voter dans les autres
              thématiques.
            </p>
          </Message>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

class Ballot extends React.Component {
  static contextType = UserContext

  static propTypes = {
    title: PropTypes.string.isRequired,
    proposals: PropTypes.array.isRequired,
    objectives: PropTypes.array.isRequired,
    collectionName: PropTypes.string.isRequired,
    numGrades: PropTypes.number,
    grades: PropTypes.array,
    user: PropTypes.any,
  }

  static defaultProps = {
    numGrades: 5,
    displayProposals: 4,
    grades: CONSTANTS.grades,
  }

  constructor(props) {
    super(props)
    this.state = {
      votes: [],
      openedModal: false,
      loading: true,
      progress: 0,
    }
    this.allVotes = []
  }

  setBallot() {
    let counter = 0
    let done = 0
    let votes = []
    for (const vote of this.allVotes) {
      if (vote.vote === null) {
        if (counter < this.props.displayProposals) {
          votes.push(vote)
          counter += 1
        }
      } else {
        done += 1
      }
    }
    this.setState({
      votes,
      loading: false,
      progress: Math.floor((done / this.allVotes.length) * 100),
    })
  }

  componentDidMount() {
    loadVote(this.props.collectionName, this.context.user.uid).then(doc => {
      this.allVotes = []
      for (let proposalId in this.props.proposals) {
        const proposal = this.props.proposals[proposalId]
        this.allVotes.push({
          vote: null,
          proposal: proposal.proposal,
          objective: this.props.objectives[proposal.objectiveId]
        })
      }

      if (doc.exists) {
        const data = doc.data()
        for (let voteId in this.allVotes) {
          const proposal = this.allVotes[voteId].proposal
          if (data[proposal]) {
            this.allVotes[voteId].vote = data[proposal]
          }
        }
      }
      shuffle(this.allVotes)
      this.setBallot()
    })
  }

  handleGradeClick = event => {
    const proposalId = parseInt(
      event.currentTarget.getAttribute("data-proposal-id")
    )
    const value = parseInt(event.currentTarget.getAttribute("data-grade-value"))
    const votes = [...this.state.votes]
    votes[proposalId].vote = value
    const done = this.state.votes.filter(vote => vote.vote).length
    this.setState({
      votes: votes,
      progress: Math.floor((done / this.allVotes.length) * 100),
    })
  }

  handleSubmit = () => {
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
    if (!canUserVote(this.context.user)) {
      this.setState({ openedModal: true })
      return
    }
    castVote(this.allVotes, this.props.collectionName, this.context.user.uid)
      .then(() => {
        toast({
          type: "success",
          icon: "vote yea",
          title: "Vote enregistré",
          description:
            "Félicitations ! Votre vote a bien été pris en compte ! Vous pouvez cependant continuer de voter.",
          animation: "bounce",
          time: 5000,
        })
        this.setBallot()
      })
      .catch(error => {
        console.log(error)
        toast({
          type: "error",
          icon: "bug",
          title: "Erreur de l'enregistrement",
          description:
            "Merci de contacter notre équipe sur contact@voterpourleclimat.fr",
          animation: "bounce",
          time: 5000,
        })
      })
    this.setState({ loading: true })
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
    const { votes, loading, progress } = this.state
    const { title, name, description, grades, ambition, groupUrl } = this.props
    const validBallot = this.check()

    if (votes.length === 0 && !loading) return <MessageDone />

    return (
      <Segment vertical style={{ margin: "5em 0" }}>
        <SemanticToastContainer />
        <PersoModal
          isOpened={this.state.openedModal}
          close={() => this.setState({ openedModal: false })}
          validate={() => {
            this.handleSubmit()
            this.setState({ openedModal: false })
          }}
        />
        <Grid container stackable centered verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as="h2" style={
                { fontSize: "4em",
                  color: "#03b37f",
                  borderBottom: "2px solid rgb(3, 179, 127)"
                }}>
                {name}
              </Header>
              <p>{description}</p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={10}>
<Button
  fluid
  as="a"
  href={groupUrl}
  target="_blank"
  className="basic teal"
  size="huge"
>
  Lire les objectifs sur le site de la convention
</Button>


</Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={14}>
              <p style={{ fontSize: "2em" }}>{title}</p>
</Grid.Column>
            <Grid.Column width={2}>
              <Progress value={progress} />

            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            {loading ? (
              <LoadingMessage />
            ) : (
              <>
                <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
                  <BallotMobile
                    grades={grades}
                    votes={votes}
                    onClick={this.handleGradeClick}
                    handleSubmit={this.handleSubmit}
                    valid={validBallot}
                  />
                </Responsive>

                <Responsive minWidth={Responsive.onlyComputer.minWidth}>
                  <BallotDesktop
                    votes={votes}
                    grades={grades}
                    onClick={this.handleGradeClick}
                    handleSubmit={this.handleSubmit}
                    valid={validBallot}
                  />
                </Responsive>
              </>
            )}
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default Ballot

import React from "react"
import PropTypes from "prop-types"
import { SemanticToastContainer, toast } from "react-semantic-toasts"
import "react-semantic-toasts/styles/react-semantic-alert.css"
import { Segment, Grid, Header, Responsive, Message } from "semantic-ui-react"
import * as CONSTANTS from "../../constants"
import { castVote, loadVote } from "../../services/actions"
import { UserContext } from "../../services/User"
import ConfirmationModal from "../Modal"
import BallotMobile from "./BallotMobile"
import BallotDesktop from "./BallotDesktop"
import "./index.css"

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

class SuccessMessage extends React.Component {
  state = { visible: false }

  constructor(props) {
    super(props)
    const { visible, onHide } = props
    this.state = { visible: visible }

    setTimeout(() => {
      console.log("TIMEOUT")
      // this.setState({ visible: false })
      // onHide()
    }, 3000)
  }

  render() {
    if (this.state.visible) {
      return (
        <Message positive>
          <Message.Header>
            Félicitations ! Votre vote a bien été pris en compte !
          </Message.Header>
          <p>Vous pouvez cependant continuer de voter.</p>
        </Message>
      )
    }
    return null
  }
}

const LoadingMessage = () => {
  return (
    <div class="ui icon message">
      <i class="notched circle loading icon"></i>
      <div class="content">
        <div class="header">Juste une seconde</div>
        <p>Nous chargeons votre bulletin de vote.</p>
      </div>
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
      success: false,
    }
    this.allVotes = []
  }

  setBallot() {
    let counter = 0
    let votes = []
    for (const vote of this.allVotes) {
      if (counter == this.props.displayProposals) break
      if (vote.vote === null) {
        votes.push(vote)
        counter += 1
      }
    }
    this.setState({ votes, loading: false })
  }

  componentDidMount() {
    loadVote(this.props.collectionName, this.context.user.uid).then(doc => {
      this.allVotes = []
      for (let proposalId in this.props.proposals) {
        this.allVotes.push({
          vote: null,
          proposal: this.props.proposals[proposalId],
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
    this.setState({ votes: votes })
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
    const { votes, loading, success } = this.state
    const { title, grades } = this.props
    const validBallot = this.check()

    if (votes.length === 0) return <MessageDone />

    return (
      <Segment vertical>
        <SemanticToastContainer />
        <ConfirmationModal
          isOpened={this.state.openedModal}
          close={() => this.setState({ openedModal: false })}
          validate={() => {
            this.handleSubmit()
            this.setState({ openedModal: false })
          }}
        />
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                {title}
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <SuccessMessage
              visible={success}
              onHide={() => this.setState({ success: false })}
            />
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

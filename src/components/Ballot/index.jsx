import React from "react"
import PropTypes from "prop-types"
import { toast, ToastContainer } from "react-toastify"
import {
  Segment,
  Grid,
  Header,
  Responsive,
  Transition,
  Message,
} from "semantic-ui-react"
import * as CONSTANTS from "../../constants"
import { castVote, loadVote } from "../../services/actions"
import { UserContext } from "../../services/User"
import ConfirmationModal from "../Modal"
import BallotMobile from "./BallotMobile"
import BallotDesktop from "./BallotDesktop"

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

  state = { votes: [], openedModal: false, loading: true, success: false }

  componentDidMount() {
    loadVote(this.props.collectionName, this.context.user.uid).then(doc => {
      const allVotes = []
      for (let proposalId in this.props.proposals) {
        allVotes[proposalId] = {
          vote: null,
          proposal: this.props.proposals[proposalId],
        }
      }
      shuffle(allVotes)
      console.log("ALL VOTES", allVotes)
      const data = doc.data()
      let votes = []
      let counter = 0
      if (doc.exists) {
        for (let voteId in allVotes) {
          if (counter == this.props.displayProposals) break
          const proposal = allVotes[voteId].proposal
          if (!data.proposal) {
            votes.push({
              vote: null,
              proposal: proposal,
            })
            counter += 1
          }
        }
      } else {
        votes = allVotes.slice(0, this.props.displayProposals)
      }
      console.log("VOTES", votes)
      this.setState({ votes, loading: false })
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
    castVote(this.state.votes, this.props.collectionName, this.context.user.uid)
    this.setState({ loading: true, success: true })
    // this.loadVote()
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

    return (
      <Segment vertical>
        <ToastContainer />
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
            {success ? (
              <Transition
                visible={true}
                onHide={() => {
                  this.setState({ success: false })
                }}
                animation="scale"
                duration={500}
              >
                <Message positive>
                  <Message.Header>
                    Félicitations ! Votre vote a bien été pris en compte !
                  </Message.Header>
                  <p>Vous pouvez cependant continuer de voter.</p>
                </Message>
              </Transition>
            ) : null}
            {loading ? (
              <div class="ui icon message">
                <i class="notched circle loading icon"></i>
                <div class="content">
                  <div class="header">Juste une seconde</div>
                  <p>Nous chargeons votre bulletin de vote.</p>
                </div>
              </div>
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

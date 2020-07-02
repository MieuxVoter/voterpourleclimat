import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { SemanticToastContainer, toast } from "react-semantic-toasts"
import "react-semantic-toasts/styles/react-semantic-alert.css"
import {
  Segment,
  Transition,
  Grid,
  Breadcrumb,
  Icon,
  Responsive,
  Message,
  Button,
  Container,
} from "semantic-ui-react"
import * as CONSTANTS from "../../constants"
import * as ROUTES from "../../constants/routes"
import { castVote, loadVote } from "../../services/actions"
import { UserContext } from "../../services/User"
import PersoModal from "./ModalPerso"
import NextModal from "./ModalNext"
import BallotMobile from "./BallotMobile"
import BallotDesktop from "./BallotDesktop"
import Progress from "../Progress"
import { shuffleList } from "../../utils"
import "./index.css"

/**
 * Check if the user gives enough info to be allowed to vote
 */
const canUserVote = user => {
  return user.name && user.zipCode && user.age
}

const LoadingMessage = () => {
  return (
    <div className="ui active inverted">
      <div className="ui text loader">Chargement du bulletin de vote</div>
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
              Vous pouvez continuer de voter dans les{" "}
              <Link to={ROUTES.LANDING}>autres thématiques</Link>.
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
    objectives: PropTypes.any.isRequired,
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
      visible: false,
      confirmNext: false,
    }
    this.allVotes = {}
  }

  setBallot() {
    let counter = 0
    let votes = []
    for (const proposal of Object.keys(this.allVotes)) {
      const vote = this.allVotes[proposal]
      if (vote.vote === null) {
        if (counter < this.props.displayProposals) {
          votes.push(vote)
          counter += 1
        }
      }
    }

    const numDones = this.done().length
    shuffleList(votes)

    this.setState({
      progress: Math.floor((numDones / this.numProposal()) * 100),
      loading: false,
      votes,
      visible: !this.state.visible,
    })
  }

  done() {
    return Object.keys(this.allVotes).filter(
      proposal => this.allVotes[proposal].vote
    )
  }

  numProposal() {
    return Object.keys(this.allVotes).length
  }

  componentDidMount() {
    loadVote(this.props.collectionName, this.context.user.uid).then(doc => {
      this.allVotes = {}
      for (let proposalId in this.props.proposals) {
        const proposal = this.props.proposals[proposalId]
        this.allVotes[proposal.proposal] = {
          vote: null,
          proposal: proposal.proposal,
          objective: this.props.objectives[proposal.objectiveId],
        }
      }

      if (doc.exists) {
        const data = doc.data()
        for (const proposal of Object.keys(this.allVotes)) {
          if (data[proposal]) {
            this.allVotes[proposal].vote = data[proposal]
          }
        }
      }
      this.setBallot()
    })
  }

  setProgress() {
    const numDones = this.done().length
    this.setState({
      progress: Math.floor((numDones / this.numProposal()) * 100),
    })
  }

  handleGradeClick = event => {
    const proposalId = parseInt(
      event.currentTarget.getAttribute("data-proposal-id")
    )
    const value = parseInt(event.currentTarget.getAttribute("data-grade-value"))
    const votes = [...this.state.votes]
    votes[proposalId].vote = value
    const proposal = votes[proposalId].proposal
    this.allVotes[proposal].vote = value
    const numDones = this.done().length
    this.setState({
      votes: votes,
      progress: Math.floor((numDones / this.numProposal()) * 100),
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

    const toStore = {}
    for (const proposal of Object.keys(this.allVotes)) {
      if (this.allVotes[proposal].vote) {
        toStore[proposal] = this.allVotes[proposal].vote
      }
    }

    castVote(toStore, this.props.collectionName, this.context.user.uid)
      .then(() => {
        if (!this.context.user.noConfirm) {
          toast({
            type: "success",
            icon: "vote yea",
            title: "Vote enregistré",
            description:
              "Félicitations ! Votre vote a bien été pris en compte ! D'autres mesures vous sont proposées dans votre bulletin de vote.",
            animation: "bounce",
            time: 5000,
          })
        }
        this.setBallot()
      })
      .catch(error => {
        console.log(error)
        toast({
          type: "error",
          icon: "bug",
          title: "Erreur de l'enregistrement",
          description:
            "Merci de contacter notre équipe sur pierre-louis@mieuxvoter.fr",
          animation: "bounce",
          time: 5000,
        })
      })
    this.setState({
      loading: true,
      confirmNext: !this.context.user.noConfirm,
    })
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
    const { votes, loading, progress, visible } = this.state
    if (votes.length === 0 && !loading) return <MessageDone />

    const { name, description, grades, icon, groupUrl } = this.props

    const validBallot = this.check()

    return (
      <Segment vertical style={{ margin: "2em 0" }}>
        <SemanticToastContainer />

        <NextModal
          isOpened={this.state.confirmNext}
          close={() => this.setState({ confirmNext: false })}
        />
        <PersoModal
          isOpened={this.state.openedModal}
          close={() => this.setState({ openedModal: false })}
          validate={() => {
            this.handleSubmit()
            this.setState({ openedModal: false })
          }}
        />
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>
              <Breadcrumb size="large">
                <Breadcrumb.Section as={Link} to={ROUTES.LANDING}>
                  Voter pour le climat
                </Breadcrumb.Section>
                <Breadcrumb.Divider icon="right chevron" />
                <Breadcrumb.Section as={Link} to={ROUTES.LANDING}>
                  Tous les thèmes
                </Breadcrumb.Section>
                <Breadcrumb.Divider icon="right chevron" />
                <Breadcrumb.Section active>
                  <Icon name={icon} className="teal" />
                  {"  "}
                  <span className="ui teal text">{name}</span>
                </Breadcrumb.Section>
              </Breadcrumb>
            </Grid.Column>
            <Grid.Column width={8} textAlign="right">
              <Button
                as="a"
                href={groupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="basic teal"
                size="large"
              >
                Lire les objectifs sur le site de la convention
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <p style={{ fontSize: "2em" }}>
                Votez sur les mesures du groupe {name}
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={14}>
              <blockquote>{description}</blockquote>
            </Grid.Column>
            <Grid.Column width={2}>
              <Progress value={progress} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Transition animation="glow" duration={1000} visible={visible}>
              <Container style={{ paddingTop: "1em" }}>
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
              </Container>
            </Transition>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default Ballot

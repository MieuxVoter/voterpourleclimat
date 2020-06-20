import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Segment, Image, Grid, Header, Icon, Button } from "semantic-ui-react"
import styled from "styled-components"
import * as ROUTES from "../constants/routes.js"
import "../index.css"
import megaphone from "../assets/images/megaphone.png"
import barChart from "../assets/images/bar-chart.png"
import timeLeft from "../assets/images/time-left.png"
import Social from "../components/Social"
import Partners from "../components/Partners"

const themes = [
  { name: "Se nourrir", icon: "utensils", to: ROUTES.SE_NOURRIR },
  { name: "Se loger", icon: "home", to: ROUTES.SE_LOGER },
  { name: "Se déplacer", icon: "truck pickup", to: ROUTES.SE_DEPLACER },
  { name: "Consommer", icon: "shopping cart", to: ROUTES.CONSOMMER },
  { name: "Produire et travailler", icon: "industry", to: ROUTES.PRODUIRE },
]

const Em = styled.span`
  text-transform: uppercase;
  font-weight: bolder;
  font-size: 1.3em;
`
const Big = styled.p`
  font-size: 1.4em;
`

const twoDigits = number => number.toString().padStart(2, "0")

const Timer = () => {
  const [time, setTime] = useState(new Date());
  const end = new Date(1594684799000)
  const remaining = new Date(end - time)
  setTimeout( () => setTime(new Date()), 1000)

  return (
    <>
      <Big>
        <Em>{twoDigits(remaining.getDate())}</Em> jours
      </Big>
      <Big>
        <Em>{twoDigits(remaining.getHours())}</Em>:
        <Em>{twoDigits(remaining.getMinutes())}</Em>:
        <Em>{twoDigits(remaining.getSeconds())}</Em> restants
      </Big>
    </>
  )
}

const VotesCounter = ({ nbVotes }) => {
  const [displayedNbVotes, setDisplayedNbVotes] = useState(0);

  const delta = Math.floor(nbVotes/400);
  setTimeout( () =>
    setDisplayedNbVotes(displayedNbVotes >= nbVotes ?
     nbVotes
     :
     displayedNbVotes + delta
     , 10)
   )

  const nbVotesFormated = new Intl.NumberFormat('fr-FR')
    .format(displayedNbVotes)

  return (
    <>
      <Big>
        <Em className="ui teal text">{nbVotesFormated}</Em>
      </Big>
      <Big>Votes ont été enregistrés. Et vous ?</Big>
      <Big>
        Rejoignez cet élan démocratique et faites entendre la voix
        citoyenne !
      </Big>
    </>
  )
}

const LandingPage = () => (
  <>
    <Segment style={{ padding: "5em 0em", fontSize: "1.33em" }} vertical>
      <Grid container stackable>
        <Grid.Row>
          <Grid.Column width={9}>
            <Header as="h3">
              La Convention Citoyenne pour le climat est un groupe de 150
              citoyen·nes français·es, tiré·es au sort.
            </Header>
            <p>
              Après huit mois de travail, d'échanges et de débat, ce panel
              représentatif a défini une série de mesures visant à
              réduire les émissions françaises de gaz à effet de serre de 40 %
              d'ici 2030 dans un esprit de justice social.
            </p>
            <p>
              Nous vous proposons sur ce site de donner votre avis sur ces
              mesures. Soyons les plus nombreux possibles à voter pour donner
              une légitimité démocratique à cette série de mesures.
            </p>
            <a href="https://www.propositions.conventioncitoyennepourleclimat.fr">
              <Button style={{ marginTop: "1em"}} className="teal" size="huge">
                Lire les 150 propositions
              </Button>
            </a>
            <a href="https://www.conventioncitoyennepourleclimat.fr">
              <Button style={{ marginTop: "1em"}} className="teal" size="huge">
                En savoir plus sur la Convention Citoyenne
              </Button>
            </a>

          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <p>Évaluez les propositions par domaine.</p>
            {themes.map((theme, index) => (
              <div key={index} style={{ marginTop: "1em" }}>
                <Button
                  fluid
                  className="dashed teal basic"
                  as={Link}
                  to={theme.to}
                  icon
                  size='huge'
                >
                  <Grid>
                    <Grid.Row>
                      <Grid.Column width={3} style={{ textAlign: "left" }}>
                        <Icon name="chevron right" />
                      </Grid.Column>
                      <Icon name={theme.icon} /> {theme.name}
                    </Grid.Row>
                  </Grid>
                </Button>
              </div>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid.Row>
        <Grid.Column textAlign="center"></Grid.Column>
      </Grid.Row>
    </Segment>

    <Segment inverted style={{ padding: "4em" }} vertical>
      <Grid columns="equal" stackable>
        <Grid.Row>
          <Grid.Column textAlign="right">
            <Big>Fin de la consultation</Big>
            <Big>
              Le <Em>13 juillet</Em> à <Em>minuit</Em>.
            </Big>
          </Grid.Column>
          <Grid.Column width={2}>
            <Image src={timeLeft} size="tiny" centered className="teal" />
          </Grid.Column>
          <Grid.Column width={7}>
            <Timer />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment style={{ padding: "10em", backgroundColor: "#e3e3e3" }} vertical>
      <Grid container stackable>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image src={barChart} className="teal large" />
          </Grid.Column>
          <Grid.Column width={6}>
            <VotesCounter nbVotes={10212} />
          </Grid.Column>
          <Grid.Column width={2}>
            <Image src={megaphone} className="teal large" />
          </Grid.Column>
          <Grid.Column width={6}>
            <Big>
              <Em className="ui teal text">PARLEZ-EN !</Em>
            </Big>
            <Big>
              À nous de porter notre voix toujours plus haut, toujours plus fort
              ! Invitez vos connaissances à rejoindre le préférendun.{" "}
            </Big>
            <Big>
              <Social />
            </Big>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment vertical style={{ margin: "5em 0" }}>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={16}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              Le groupement associatif
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Partners />
        </Grid.Row>
      </Grid>
    </Segment>
  </>
)

export default LandingPage

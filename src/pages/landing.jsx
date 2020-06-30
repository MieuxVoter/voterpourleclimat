import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  Icon,
  Segment,
  Progress,
  Image,
  Grid,
  Header,
  Button,
} from "semantic-ui-react"
import styled from "styled-components"
import "../index.css"
import Step from "../components/Step"
import timeLeft from "../assets/images/time-left.png"
import Partners from "../components/Partners"
import * as themes from "../constants/themes"
import { shuffleOutPlace } from "../utils"

const numVotes = 485023
const numVoters = 18753
const goalVotes = 1000000
const goalVoters = 100000

const Em = styled.span`
  text-transform: uppercase;
  font-weight: bolder;
  font-size: 1.3em;
`
const Big = styled.p`
  font-size: 1.4em;
`
const randomThemes = shuffleOutPlace(themes)

const twoDigits = number => number.toString().padStart(2, "0")

const Timer = () => {
  const [time, setTime] = useState(new Date())
  const end = new Date(1594684799000)
  const remaining = new Date(end - time)
  setTimeout(() => setTime(new Date()), 1000)

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

const DynamicProgress = ({ value, total, unit }) => {
  const [displayedValue, setDisplayedValue] = useState(0)

  const delta = Math.floor(value / 400)
  setTimeout(() =>
    setDisplayedValue(
      displayedValue >= value ? value : displayedValue + delta,
      10
    )
  )

  const formattedValue = new Intl.NumberFormat("fr-FR").format(displayedValue)
  return (
    <Progress
      percent={Math.ceil((displayedValue / total) * 100)}
      progress="percent"
      indicating
    >
      Déjà {formattedValue} {unit} !
    </Progress>
  )
}

const LandingPage = () => (
  <>
    <Segment
      style={{ padding: "3em 0em", textAlign: "justify", fontSize: "1.33em" }}
      vertical
    >
      <Grid container stackable>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header>150 citoyens, 149 propositions émises</Header>
            <p>
              La Convention Citoyenne pour le Climat vient de rendre publiques
              ses{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://propositions.conventioncitoyennepourleclimat.fr"
              >
                propositions
              </a>{" "}
              afin de réduire les émissions françaises de gaz à effet de serre
              d'au moins 40 % d'ici 2030 (par rapport à 1990) dans un esprit de
              justice sociale.
            </p>
            <blockquote>
              L’enjeu, c’est que le débat qui a eu lieu à 150 se diffuse à 44
              millions d’électeurs.{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.liberation.fr/france/2020/06/20/cyril-dion-l-enjeu-c-est-que-le-debat-qui-a-eu-lieu-a-150-se-diffuse-a-44-millions-d-electeurs_1791764"
              >
                Cyril Dion
              </a>
            </blockquote>
            <Header>
              <Link to={randomThemes[Object.keys(randomThemes)[0]].to}>
                VOTEZ
              </Link>{" "}
              sur ces propositions pour faire entendre votre voix
            </Header>
            Atteignons 100 000 participants et 1 000 000 de votes enregistrés.
            <DynamicProgress
              value={numVoters}
              total={goalVoters}
              unit="participants"
            />
            <DynamicProgress value={numVotes} total={goalVotes} unit="votes" />
          </Grid.Column>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={6}>
            <p>Choississez une thématique pour voter</p>

            {Object.keys(randomThemes).map(themeIndex => {
              const theme = randomThemes[themeIndex]
              return (
                <Button
                  fluid
                  className="dashed teal basic"
                  as={Link}
                  to={theme.to}
                  icon
                  size="huge"
                  style={{ marginBottom: "10px" }}
                >
                  <Grid>
                    <Grid.Row>
                      <Grid.Column width={1} style={{ textAlign: "left" }}>
                        <Icon name="chevron right" />
                      </Grid.Column>
                      <Grid.Column
                        width={14}
                        style={{ textAlign: "center", fontWeight: "bolder" }}
                      >
                        <Icon name={theme.icon} /> {theme.name}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Button>
              )
            })}
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

    <Step />

    <Segment vertical style={{ margin: "5em 0" }}>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={16}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              Les partenaires de la consultation
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

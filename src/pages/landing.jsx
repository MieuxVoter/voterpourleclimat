import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  Icon,
  Segment,
  Progress,
  Grid,
  Image,
  Header,
  Responsive,
  Button,
} from "semantic-ui-react"
import "../index.css"
import styled from "styled-components"
import Step from "../components/Step"
import Partners from "../components/Partners"
import * as themes from "../constants/themes"
import { shuffleOutPlace } from "../utils"
import cyrilDion from "../assets/images/cyril-dion.jpg"
import ccc from "../assets/images/ccc.jpg"
import { numVoters, numVotes, goalVoters, goalVotes } from "../constants/stats"

const randomThemes = shuffleOutPlace(themes)

const Caption = styled.h6`
  text-align: center;
  color: grey;
`

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
      data-tooltip="Mise à jour quotidiennement"
      percent={Math.ceil((displayedValue / total) * 100)}
      progress="percent"
      indicating
    >
      Déjà {formattedValue} {unit} !
    </Progress>
  )
}

const Description = () => (
  <p>
    La Convention Citoyenne pour le Climat vient de rendre publiques ses{" "}
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://propositions.conventioncitoyennepourleclimat.fr"
    >
      propositions
    </a>{" "}
    afin de réduire les émissions françaises de gaz à effet de serre d'au moins
    40 % d'ici 2030 (par rapport à 1990) dans un esprit de justice sociale.
  </p>
)

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
            <Responsive {...Responsive.onlyMobile}>
              <Image src={ccc} centered />
              <Caption>
                Photo : © Katrin Baumann / Convention citoyenne pour le climat
              </Caption>
              <Description />
            </Responsive>
            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
              <Description />
              <Image src={ccc} centered />
              <Caption>
                Photo : © Katrin Baumann / Convention citoyenne pour le climat
              </Caption>
            </Responsive>
          </Grid.Column>
          <Grid.Column width={1}></Grid.Column>
          <Grid.Column width={7}>
            <Header>
              <Link to={randomThemes[Object.keys(randomThemes)[0]].to}>
                Donnez votre avis
              </Link>{" "}
              pour faire entendre votre voix
            </Header>
            Atteignons 100 000 participants et 1 000 000 de votes enregistrés.
            {
              //    <Icon circular size="small" color="teal" inverted name="question" />
              // <DynamicProgress
              //   value={numVoters}
              //   total={goalVoters}
              //   unit="participants"
              // />
            }
            <DynamicProgress value={numVotes} total={goalVotes} unit="votes" />
            <p>Choississez une thématique pour donner votre avis</p>
            {Object.keys(randomThemes).map(themeIndex => {
              const theme = randomThemes[themeIndex]
              return (
                <Button
                  key={themeIndex}
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

    <Step />

    <Segment inverted vertical>
      <Grid
        columns="equal"
        style={{ marginLeft: "3em", marginRight: "3em" }}
        stackable
      >
        <Grid.Row>
          <Grid.Column width={5} textAlign="right"></Grid.Column>
          <Grid.Column width={2} textAlign="center" verticalAlign="middle">
            <Image
              src={cyrilDion}
              centered
              circular
              size="medium"
              verticalAlign="middle"
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.liberation.fr/france/2020/06/20/cyril-dion-l-enjeu-c-est-que-le-debat-qui-a-eu-lieu-a-150-se-diffuse-a-44-millions-d-electeurs_1791764"
            >
              <div className="blockquote-wrapper">
                <div className="blockquote">
                  <h1>
                    L’enjeu, c’est que le débat qui a eu lieu à 150 se diffuse à
                    44 millions d’électeurs.
                  </h1>
                  <h4>&mdash; Cyril Dion</h4>
                </div>
              </div>
            </a>
          </Grid.Column>
          <Grid.Column width={2} textAlign="right"></Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

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

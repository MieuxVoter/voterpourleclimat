import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  Icon,
  Segment,
  Progress,
  Grid,
  Image,
  Header,
  Button,
} from "semantic-ui-react"
import "../index.css"
import Step from "../components/Step"
import Partners from "../components/Partners"
import * as themes from "../constants/themes"
import { shuffleOutPlace } from "../utils"
import cyrilDion from "../assets/images/cyril-dion.jpg"
import { numVoters, numVotes, goalVoters, goalVotes } from "../constants/stats"

const randomThemes = shuffleOutPlace(themes)

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
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/Paq_7JwFFr8"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </Grid.Column>
          <Grid.Column width={1}></Grid.Column>
          <Grid.Column width={7}>
            <Header>
              <Link to={randomThemes[Object.keys(randomThemes)[0]].to}>
                VOTEZ
              </Link>{" "}
              pour faire entendre votre voix
            </Header>
            Atteignons 100 000 participants et 1 000 000 de votes enregistrés.
            {
              //    <Icon circular size="small" color="teal" inverted name="question" />
            }
            <DynamicProgress
              value={numVoters}
              total={goalVoters}
              unit="participants"
            />
            <DynamicProgress value={numVotes} total={goalVotes} unit="votes" />
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

    <Step />

    <Segment inverted vertical>
      <Grid columns="equal" stackable>
        <Grid.Row>
          <Grid.Column width={5} textAlign="right"></Grid.Column>
          <Grid.Column width={2} textAlign="center" verticalAlign="middle">
            <Image
              src={cyrilDion}
              centered
              circular
              style={{ maxWidth: "200px" }}
              size="medium"
              verticalAlign="middle"
            />
          </Grid.Column>
          <Grid.Column width={5}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.liberation.fr/france/2020/06/20/cyril-dion-l-enjeu-c-est-que-le-debat-qui-a-eu-lieu-a-150-se-diffuse-a-44-millions-d-electeurs_1791764"
            >
              <div class="blockquote-wrapper">
                <div class="blockquote">
                  <h1>
                    L’enjeu, c’est que le débat qui a eu lieu à 150 se diffuse à
                    44 millions d’électeurs.
                  </h1>
                  <h4>&mdash; Cyril Dion</h4>
                </div>
              </div>
            </a>
          </Grid.Column>
          <Grid.Column width={3} textAlign="right"></Grid.Column>
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

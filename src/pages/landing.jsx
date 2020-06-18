import React from "react"
import { Link } from "react-router-dom"
import {
  Segment,
  Grid,
  Container,
  Header,
  Icon,
  Button,
} from "semantic-ui-react"
import * as ROUTES from "../constants/routes.js"
import "../index.css"

const themes = [
  { name: "Se nourrir", icon: "utensils", to: ROUTES.SE_NOURRIR },
  { name: "Se loger", icon: "home", to: ROUTES.SE_LOGER },
  { name: "Se déplacer", icon: "truck pickup", to: ROUTES.SE_DEPLACER },
  { name: "Consommer", icon: "shopping cart", to: ROUTES.CONSOMMER },
  { name: "Produire", icon: "industry", to: ROUTES.PRODUIRE },
]

const LandingPage = () => (
  <Segment style={{ padding: "8em 0em" }} vertical>
    <Grid container stackable>
      <Grid.Row>
        <Grid.Column width={10}>
          <Header as="h3" style={{ fontSize: "2em" }}>
            La Convention Citoyenne pour le climat est un groupe de 150
            citoyen·nes français·es, tiré·es au sort.
          </Header>
          <p style={{ fontSize: "1.33em" }}>
            Ce panel représentatif a défini une série de mesures visant à
            réduire les émissions françaises de gaz à effet de serre de 40 %
            d'ici 2030 dans un esprit de justice social.
          </p>
          <p style={{ fontSize: "1.33em" }}>
            Nous vous proposons sur ce site de donner votre avis sur ces
            mesures. Soyons les plus nombreux possibles à voter pour donner une
            légitimité démocratique à cette série de mesures.
          </p>
          <a href="https://www.conventioncitoyennepourleclimat.fr">
            <Button className="teal" size="huge">
              Détails sur la Convention Citoyenne
            </Button>
          </a>
        </Grid.Column>
        <Grid.Column floated="right" width={4}>
          <p>Evaluez les propositions par domaine.</p>
          {themes.map((theme, index) => (
            <div key={index} style={{ marginTop: "1em" }}>
              <Button
                fluid
                className="dashed teal basic"
                as={Link}
                to={theme.to}
                icon
              >
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={6} style={{ textAlign: "left" }}>
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
      <Grid.Row>
        <Grid.Column textAlign="center"></Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
)

export default LandingPage

import React from "react"
import { Segment, Grid, Header } from "semantic-ui-react"

const NousContacter = () => (
  <Segment vertical style={{ margin: "5em 0" }}>
    <Grid container stackable verticalAlign="middle">
      <Grid.Row>
        <Grid.Column width={16}>
          <Header>Contact presse et média</Header>
          <p>
            <a href="mailto:presse@mieuxvoter.fr">presse@mieuxvoter.fr</a>
          </p>
          <Header>RGPD : demande de retrait d'informations personnelles</Header>
          <p>
            <a href="mailto:rgpd@mieuxvoter.fr">rgpd@mieuxvoter.fr</a>
          </p>
          <Header>Retours sur la plateforme et son ergonomie</Header>
          <p>
            <a href="mailto:pierre-louis@mieuxvoter.fr">
              pierre-louis@mieuxvoter.fr
            </a>
          </p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
)

export default NousContacter

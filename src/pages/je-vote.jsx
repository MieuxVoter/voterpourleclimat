import React from "react"
import { Grid, Segment, Header, Icon, Button } from "semantic-ui-react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import * as themes from "../constants/themes"

const P = styled.p`
  font-size: 1.4rem;
  text-align: justify;
  margin: 1em;
`

const JeVotePage = () => (
  <Segment vertical style={{ margin: "5em 0" }}>
    <Grid container stackable verticalAlign="middle">
      <Grid.Row>
        <Header as="h2">Evaluez les propositions par domaine</Header>
      </Grid.Row>
      {Object(themes)
        .keys()
        .map((theme, index) => (
          <Grid.Row>
            <Grid.Column
              key={index}
              style={{ marginTop: "0.3em", padding: "0 0.5rem" }}
            >
              <Button
                fluid
                className="dashed teal basic"
                as={Link}
                to={theme.to}
                icon
                size="huge"
              >
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={1} style={{ textAlign: "left" }}>
                      <Icon name="chevron right" />
                    </Grid.Column>
                    <Grid.Column width={15} style={{ textAlign: "center" }}>
                      <Icon name={theme.icon} /> {theme.name}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Button>
              <P>{theme.description}</P>
            </Grid.Column>
          </Grid.Row>
        ))}
    </Grid>
  </Segment>
)

export default JeVotePage

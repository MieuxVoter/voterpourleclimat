import React from "react"
import { Link } from "react-router-dom"
import { Segment, Image, Container, Grid } from "semantic-ui-react"
import logo from "../assets/images/logo.png"
import tree from "../assets/images/tree.png"

const Banner = () => (
  <Segment className="teal" inverted vertical>
    <Container>
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={8}>
            <Link to="/">
              <Image verticalAlign="middle" src={logo} size="large" />
            </Link>
          </Grid.Column>
          <Grid.Column width={8}>
            <Image verticalAlign="bottom" src={tree} size="small" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
)

export default Banner

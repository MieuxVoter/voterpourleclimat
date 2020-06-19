import React from "react"
import { Link } from "react-router-dom"
import { Segment, Image, Container, Grid } from "semantic-ui-react"
import logo from "../assets/images/logo.png"
import tree from "../assets/images/tree.png"

const Banner = () => (
  <Segment className="teal" inverted vertical>
    <Container>
      <Grid inverted stackable>
        <Grid.Row style={{ paddingBottom: 0 }}>
          <Grid.Column width={8} textAlign="center">
            <Link to="/">
              <Image verticalAlign="bottom" src={logo} size="large" />
            </Link>
          </Grid.Column>
          <Grid.Column width={8}>
            <Image verticalAlign="bottom" src={tree} size="medium" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
)

export default Banner

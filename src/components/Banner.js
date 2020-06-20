import React from "react"
import { Link } from "react-router-dom"
import { Segment, Image, Container, Grid, Responsive } from "semantic-ui-react"
import logo from "../assets/images/logo.png"
import tree from "../assets/images/tree.png"

const DesktopBanner = () => (
  <Segment className="teal" inverted vertical>
    <Container>
      <Grid inverted stackable>
        <Grid.Row style={{ paddingBottom: 0 }}>
          <Grid.Column width={8} textAlign="center">
            <Link to="/">
              <Image verticalAlign="bottom" src={logo} size="medium" />
            </Link>
          </Grid.Column>
          <Grid.Column width={8} style={{ paddingBottom: 0 }}>
            <Image verticalAlign="bottom" src={tree} size="small" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
);

const MobileBanner = () => (
  <Segment className="teal" inverted vertical>
    <Container>
      <Grid inverted stackable>
        <Grid.Row style={{ paddingBottom: 0 }}>
          <Grid.Column width={4} textAlign="center">
            <Link to="/">
              <Image verticalAlign="bottom" src={logo} size="medium" />
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
);

const Banner = () => (
  <>
    <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
      <MobileBanner />
    </Responsive>
    <Responsive minWidth={Responsive.onlyComputer.minWidth}>
      <DesktopBanner />
    </Responsive>
  </>
)

export default Banner

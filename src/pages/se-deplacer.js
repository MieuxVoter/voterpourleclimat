import React from "react"
import { Segment, Grid, Header } from "semantic-ui-react"
import Layout from "../components/layout"

const SeNourrirPage = () => (
  <Layout>
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as="h3" style={{ fontSize: "2em" }}>
              Quelles mesures souhaiteriez-vous rendre prioritaires pour se
              nourrir ?
            </Header>
            <p style={{ fontSize: "1.33em" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id
              tortor diam. Suspendisse vel viverra ex. Pellentesque nec diam eu
              neque tincidunt tempus sit amet ac dolor. Nullam accumsan interdum
              mi sed fringilla. Fusce nibh quam, pharetra nec diam sed,
              consectetur dapibus sem. Pellentesque ac eros luctus lacus
              vehicula mollis. Class aptent taciti sociosqu ad litora torquent
              per conubia nostra, per inceptos himenaeos. Pellentesque habitant
              morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Maecenas sed convallis ipsum, vel porta dui. Maecenas a
              diam eu sem ultricies aliquet non eget ligula. Sed turpis nisi,
              venenatis non arcu sed, finibus luctus nisl. Duis bibendum metus
              nunc, eu dictum dui rhoncus vel. In fringilla eget ante sed
              tempor. Curabitur tristique ut sem vel scelerisque. Vivamus at est
              quis metus finibus placerat pharetra sit amet lorem. Phasellus
              blandit lacinia fringilla. Cras feugiat risus enim, commodo
              bibendum ipsum eleifend eu. Nunc rutrum eros dictum venenatis
              commodo. Donec mauris odio, scelerisque sed semper ac, elementum
              sed arcu. Etiam molestie finibus fermentum. Suspendisse potenti.
              Nulla elit eros, tempor at ipsum sit amet, elementum aliquam dui.
              Sed erat nisi, sollicitudin quis diam sit amet, pulvinar accumsan
              metus. Aenean ac elit nec justo convallis gravida eu sit amet
              elit. Phasellus ac nunc justo. Nullam laoreet porta nulla, vitae
              tincidunt sapien molestie eu.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </Layout>
)

export default SeNourrirPage

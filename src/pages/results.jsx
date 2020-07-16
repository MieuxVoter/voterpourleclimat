import React from "react"
import { Link } from "react-router-dom"
import {
  Card,
  Responsive,
  Segment,
  Grid,
  Button,
  Header,
  Label,
  Accordion,
  Breadcrumb,
  Icon,
} from "semantic-ui-react"
import { grades } from "../constants"
import * as ROUTES from "../constants/routes"
import Consommer from "../data/consommer.mj.json"
import Produire from "../data/produire.mj.json"
import SeLoger from "../data/seLoger.mj.json"
import SeDeplacer from "../data/seDeplacer.mj.json"
import SeNourrir from "../data/seNourrir.mj.json"
import Constitution from "../data/constitution.mj.json"
import "./results.css"

const themes = {
  Consommer: Consommer,
  Produire: Produire,
  "Se loger": SeLoger,
  "Se déplacer": SeDeplacer,
  "Se nourrir": SeNourrir,
  Produire: Constitution,
}

const QuickAccess = ({ mobile }) => (
  <>
    <Button
      icon
      size="large"
      className="teal"
      labelPosition="left"
      as="a"
      fluid={mobile}
      href="https://resultats.voterpourleclimat.com"
      target="_blank"
      rel="noreferrer noopener"
    >
      <Icon name="filter" />
      Filtrer les résultats
    </Button>
    <Button
      icon
      fluid={mobile}
      size="large"
      className="yellow"
      labelPosition="left"
      as="a"
      href="https://drive.google.com/file/d/16t4LPcWFJmAnUR6rX17XeBZ_2owi2IYN/view?usp=drivesdk"
      target="_blank"
      rel="noreferrer noopener"
    >
      <Icon name="diagnoses" />
      Notre analyse
    </Button>
  </>
)

const ResultCard = ({ rank, measure }) => {
  let grade
  for (const candidate of grades) {
    if (candidate.value == measure.majority_grade) {
      grade = candidate
      break
    }
  }

  return (
    <Card fluid>
      <Card.Content>
        <Label size="large" className={`${grade.color} right floated`}>
          {grade.name}
          <div className="detail"># {rank + 1}</div>
        </Label>
        <Card.Header>{measure.measure}</Card.Header>
        <Card.Description style={{ marginBottom: "1em" }}>
          <div className="median"></div>
          <div className="median-label">50%</div>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                {grades.map((grade, index) => (
                  <td
                    className={`${grade.color} result`}
                    key={index}
                    style={{
                      width: `${measure.normalized[grade.value] * 100}%`,
                    }}
                  >
                    {measure.normalized[grade.value] < 0.05 ? (
                      <span
                        className="outgauge"
                        style={{
                          left: `${
                            (measure.normalized[grade.index] * 100) / 2
                          }%`,
                          top: index % 2 == 0 ? "-20px" : "25px",
                        }}
                      >
                        {Math.floor(100 * measure.normalized[grade.value])}%
                      </span>
                    ) : (
                      <span>
                        {Math.floor(100 * measure.normalized[grade.value])}%
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <span className="right floated">
          <i className="question circle icon"></i>
          {measure.counts_per_grade[-1]} « Pas d'avis »
        </span>
        <i className="vote yea icon"></i>
        {Object.keys(measure.counts_per_grade).reduce(
          (a, b) => a + measure.counts_per_grade[b],
          0
        )}{" "}
        avis exprimés
      </Card.Content>
    </Card>
  )
}

const ResultsByTheme = theme =>
  theme.theme.map((measure, rank) => (
    <ResultCard key={rank} measure={measure} rank={rank} />
  ))

class ResultPage extends React.Component {
  state = { activeIndex: 0 }
  themeRefs = {}

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    console.log("Set to", newIndex)
    this.setState({ activeIndex: newIndex })
    window.scrollTo(0, this.themeRefs[index].current.offsetTop)
  }

  render() {
    const { activeIndex } = this.state
    console.log(activeIndex)
    return (
      <Segment vertical style={{ margin: "5em 0" }}>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>
              <Breadcrumb size="large">
                <Breadcrumb.Section as={Link} to={ROUTES.LANDING}>
                  Voter pour le climat
                </Breadcrumb.Section>
                <Breadcrumb.Divider icon="right chevron" />
                <Breadcrumb.Section active>
                  <Icon name="poll" className="teal" />
                  {"  "}
                  <span className="ui teal text">Résultats</span>
                </Breadcrumb.Section>
              </Breadcrumb>
            </Grid.Column>
            <Grid.Column textAlign="right" width={8}>
              <Responsive {...Responsive.onlyMobile}>
                <QuickAccess mobile={true} />
              </Responsive>
              <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <QuickAccess mobile={false} />
              </Responsive>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              {Object.keys(themes).map((name, index) => {
                const ref = React.createRef()
                console.log(this.themeRefs)
                this.themeRefs[index] = ref
                return (
                  <Accordion key={index}>
                    <Accordion.Title
                      ref={ref}
                      active={activeIndex === index}
                      index={index}
                      onClick={this.handleClick}
                    >
                      <Header as="h3">
                        <Icon name="dropdown" /> {name}
                      </Header>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === index}>
                      <ResultsByTheme theme={themes[name]} />
                    </Accordion.Content>
                  </Accordion>
                )
              })}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default ResultPage

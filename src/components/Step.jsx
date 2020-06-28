import React from "react"
import { Link } from "react-router-dom"
import { List, Image, Container, Segment } from "semantic-ui-react"
import * as ROUTES from "../constants/routes"
import * as THEMES from "../constants/themes"
import { useUser } from "../services/User"
import { shuffleOutPlace } from "../utils"

const randomThemes = shuffleOutPlace(THEMES)

const StepForProcess = () => {
  const { user } = useUser()
  const randomTheme = randomThemes[Object.keys(randomThemes)[0]]
  console.log(randomThemes)
  const steps = [
    // {
    //   emoji: ":book:",
    //   header: "S'informer",
    //   content: "sur chaque mesure",
    // },
    {
      emoji: ":ballot_box:",
      header: "Voter par thème",
      content: "au jugement majoritaire",
      link: randomTheme.to,
    },

    {
      emoji: ":loudspeaker:",
      header: "Partager",
      content: "votre engagement",
      href: `https://www.facebook.com/sharer/sharer.php?u=voterpourleclimat.fr${ROUTES.SHARE}/${user.uid}`,
    },
    {
      emoji: ":incoming_envelope:",
      header: "Résultats transmis",
      content: "au gouvernement",
    },
  ]
  return (
    <Segment
      style={{ padding: "5em 1em", backgroundColor: "#eaeaea" }}
      vertical
    >
      <Container textAlign="center">
        <List horizontal divided size="huge">
          {steps.map((step, stepId) => {
            const Content = () => (
              <>
                <Image style={{ fontSize: "3em", paddingRight: 0 }}>
                  <em data-emoji={step.emoji}></em>
                </Image>
                <List.Content>
                  <List.Header>{step.header}</List.Header>
                  {step.content}
                </List.Content>
              </>
            )
            if (step.link)
              return (
                <List.Item key={stepId} as={Link} to={step.link}>
                  <Content />
                </List.Item>
              )
            if (step.href)
              return (
                <List.Item key={stepId} as="a" href={step.href}>
                  <Content />
                </List.Item>
              )
            return (
              <List.Item key={stepId}>
                <Content />
              </List.Item>
            )
          })}
        </List>
      </Container>
    </Segment>
  )
}

export default StepForProcess

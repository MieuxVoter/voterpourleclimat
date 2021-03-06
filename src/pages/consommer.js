import React from "react"
import Ballot from "../components/Ballot"
import { CONSOMMER as theme } from "../constants/themes"

const ConsommerPage = () => {
  return (
    <Ballot
      title={theme.title}
      icon={theme.icon}
      name={theme.name}
      description={theme.description}
      proposals={theme.proposals}
      objectives={theme.objectives}
      collectionName={theme.collection}
      groupUrl={theme.groupUrl}
    />
  )
}

export default ConsommerPage

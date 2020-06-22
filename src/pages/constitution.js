import React from "react"
import Ballot from "../components/Ballot"
import { CONSTITUTION as theme } from "../constants/themes"

const ConstitutionPage = () => {
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

export default ConstitutionPage

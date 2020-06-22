import React from "react"
import Ballot from "../components/Ballot"
import { PRODUIRE as theme } from "../constants/themes"

const ProduirePage = () => {
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

export default ProduirePage

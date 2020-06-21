import React from "react"
import Ballot from "../components/Ballot"
import { SE_NOURRIR as theme } from "../constants/themes"

const SeNourrirPage = () => {
  return (
    <Ballot
      title={theme.title}
      name={theme.name}
      description={theme.description}
      proposals={theme.proposals}
      collectionName={theme.collection}
    />
  )
}

export default SeNourrirPage

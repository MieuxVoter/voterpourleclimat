import React from "react"
import { useUser } from "../services/User"
import Ballot from "../components/Ballot"
import * as TITLES from "../constants/titles"
import * as PROPOSALS from "../constants/proposals"
import { SE_NOURRIR as theme } from "../constants/themes"

const SeLogerPage = () => {
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

export default SeLogerPage

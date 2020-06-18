import React from "react"
import { useUser } from "../services/User"
import Ballot from "../components/Ballot"
import * as TITLES from "../constants/titles"
import * as PROPOSALS from "../constants/proposals"

const SeDeplacerPage = () => {
  const { user } = useUser()
  console.log(user)
  if (!user) return <></>

  return (
    <Ballot
      title={TITLES.SE_DEPLACER}
      collectionName="seDeplacer"
      proposals={PROPOSALS.SE_DEPLACER}
    />
  )
}

export default SeDeplacerPage

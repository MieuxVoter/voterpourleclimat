import React from "react"
import { useUser } from "../services/User"
import Vote from "../components/Vote"
import * as TITLES from "../constants/titles"
import * as PROPOSALS from "../constants/proposals"

const SeNourrirPage = () => {
  const { user } = useUser()
  console.log(user)
  if (!user) return <></>

  return (
    <Vote
      title={TITLES.SE_NOURRIR}
      proposals={PROPOSALS.SE_NOURRIR}
      collectionName="seNourrir"
    />
  )
}

export default SeNourrirPage

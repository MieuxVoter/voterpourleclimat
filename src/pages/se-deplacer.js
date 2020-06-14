import React from "react"
import { useUser } from "../services/User"
import Vote from "../components/Vote"
import * as TITLES from "../constants/titles"
import * as PROPOSALS from "../constants/proposals"

const SeDeplacerPage = () => {
  const { user } = useUser()
  console.log(user)
  if (!user) return <></>

  console.log("SE DEPLACER")
  const hasVoted = user.seDeplacer.votes.length === 0
  return (
    <Vote
      title={TITLES.SE_DEPLACER}
      hasVoted={hasVoted}
      proposals={PROPOSALS.SE_DEPLACER}
    />
  )
}

export default SeDeplacerPage;

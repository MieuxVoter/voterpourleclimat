import React from "react"
import { useUser } from "../services/User"
import Vote from "../components/Vote"
import * as TITLES from "../constants/titles"
import * as PROPOSALS from "../constants/proposals"

const SeNourrirPage = () => {
  const { user } = useUser()
  console.log(user)
  if (!user) return <></>

  console.log("SE NOURRIR")
  const hasVoted = user.seNourrir.votes.length === 0
  return (
    <Vote
      title={TITLES.SE_NOURRIR}
      hasVoted={hasVoted}
      proposals={PROPOSALS.SE_NOURRIR}
    />
  )
}

export default SeNourrirPage;

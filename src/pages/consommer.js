import React from "react"
import { useUser } from "../services/User"
import Vote from "../components/Vote"
import * as TITLES from "../constants/titles"
import * as PROPOSALS from "../constants/proposals"

const ConsommerPage = () => {
  const { user } = useUser()
  console.log(user)
  if (!user) return <></>

  const hasVoted = user.consommer.votes.length === 0
  return (
    <Vote
      title={TITLES.CONSOMMER}
      hasVoted={hasVoted}
      proposals={PROPOSALS.CONSOMMER}
    />
  )
}

export default ConsommerPage;

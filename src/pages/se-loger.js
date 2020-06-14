import React from "react"
import { useUser } from "../services/User"
import Vote from "../components/Vote"
import * as TITLES from "../constants/titles"
import * as PROPOSALS from "../constants/proposals"

const SeLogerPage = () => {
  const { user } = useUser()
  console.log(user)
  if (!user) return <></>

  console.log("SE LOGER")
  const hasVoted = user.seLoger.votes.length === 0
  return (
    <Vote
      title={TITLES.SE_LOGER}
      hasVoted={hasVoted}
      proposals={PROPOSALS.SE_LOGER}
    />
  )
}

export default SeLogerPage;

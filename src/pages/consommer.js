import React from "react"
import { useUser } from "../services/User"
import Ballot from "../components/Ballot"
import * as TITLES from "../constants/titles"
import * as PROPOSALS from "../constants/proposals"

const ConsommerPage = () => {
  const { user } = useUser()
  console.log(user)
  if (!user) return <></>

  const hasBallotd = user.consommer.votes.length === 0
  return (
    <Ballot
      title={TITLES.CONSOMMER}
      hasBallotd={hasBallotd}
      proposals={PROPOSALS.CONSOMMER}
    />
  )
}

export default ConsommerPage;

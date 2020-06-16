import React from "react"
import { useUser } from "../services/User"
import Ballot from "../components/Ballot"
import * as TITLES from "../constants/titles"
import * as PROPOSALS from "../constants/proposals"

const ProduirePage = () => {
  const { user } = useUser()
  console.log(user)
  if (!user) return <></>

  const hasBallotd = user.seLoger.votes.length === 0
  return (
    <Ballot
      title={TITLES.PRODUIRE}
      hasBallotd={hasBallotd}
      proposals={PROPOSALS.PRODUIRE}
    />
  )
}

export default ProduirePage;

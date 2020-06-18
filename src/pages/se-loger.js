import React from "react"
import { useUser } from "../services/User"
import Ballot from "../components/Ballot"
import * as TITLES from "../constants/titles"
import * as PROPOSALS from "../constants/proposals"

const SeLogerPage = () => {
  const { user } = useUser()
  console.log(user)
  if (!user) return <></>

  return (
    <Ballot
      title={TITLES.SE_LOGER}
      proposals={PROPOSALS.SE_LOGER}
      collectionName="seLoger"
    />
  )
}

export default SeLogerPage

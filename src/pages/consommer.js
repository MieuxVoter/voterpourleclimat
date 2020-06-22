import React from "react"
import { useUser } from "../services/User"
import Ballot from "../components/Ballot"
import { CONSOMMER as theme } from "../constants/themes"

const ConsommerPage = () => {
  const { user } = useUser()
  console.log(user)
  if (!user) return <></>

  return (
    <Ballot
      title={theme.title}
      name={theme.name}
      description={theme.description}
      proposals={theme.proposals}
      objectives={theme.objectives}
      collectionName={theme.collection}
      groupUrl={theme.groupUrl}
    />
  )
}

export default ConsommerPage

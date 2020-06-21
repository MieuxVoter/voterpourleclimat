import React from "react"
import { useUser } from "../services/User"
import Ballot from "../components/Ballot"
import { PRODUIRE as theme } from "../constants/themes"

const ProduirePage = () => {
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

export default ProduirePage

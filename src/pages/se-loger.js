import React from "react"
import { useUser } from "../services/User"
import Ballot from "../components/Ballot"
import { SE_LOGER as theme } from "../constants/themes"

const SeLogerPage = (
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

export default SeLogerPage

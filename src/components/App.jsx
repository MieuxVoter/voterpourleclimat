import React from "react"
import { Route, Switch } from "react-router-dom"
import Layout from "./layout"
import Landing from "../pages/landing"
import JeVote from "../pages/je-vote"
import SeNourrir from "../pages/se-nourrir"
import SeDeplacer from "../pages/se-deplacer"
import SeLoger from "../pages/se-loger"
import Consommer from "../pages/consommer"
import Produire from "../pages/produire"
import Constitution from "../pages/constitution"
import PrivatePolicy from "../pages/policy"
import Results from "../pages/results"
import NousContacter from "../pages/contact"
import Terms from "../pages/legal"
import * as ROUTES from "../constants/routes"

function App() {
  return (
    <Layout>
      <Switch>
        <Route path={ROUTES.JE_VOTE} component={JeVote} />
        <Route path={ROUTES.PRIVACY_POLICY} component={PrivatePolicy} />
        <Route path={ROUTES.TERMS} component={Terms} />
        <Route path={ROUTES.SE_NOURRIR} component={SeNourrir} />
        <Route path={ROUTES.SE_DEPLACER} component={SeDeplacer} />
        <Route path={ROUTES.SE_LOGER} component={SeLoger} />
        <Route path={ROUTES.CONSOMMER} component={Consommer} />
        <Route path={ROUTES.PRODUIRE} component={Produire} />
        <Route path={ROUTES.CONSTITUTION} component={Constitution} />
        <Route path={ROUTES.NOUS_CONTACTER} component={NousContacter} />
        <Route path={ROUTES.RESULTS} component={Results} />

        <Route component={Landing} />
      </Switch>
    </Layout>
  )
}

export default App

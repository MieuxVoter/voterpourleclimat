import React from "react"
import { Route } from "react-router-dom"
import Layout from "./layout"
import Landing from "../pages/landing"
import JeVote from "../pages/je-vote"
import SeNourrir from "../pages/se-nourrir"
import SeDeplacer from "../pages/se-deplacer"
import SeLoger from "../pages/se-loger"
import Consommer from "../pages/consommer"
import Produire from "../pages/produire"

function App() {
  return (
    <Layout>
      <Route exact path="/" component={Landing} />

      <Route path="/je-vote" component={JeVote} />
      <Route path="/se-nourrir" component={SeNourrir} />
      <Route path="/se-deplacer" component={SeDeplacer} />
      <Route path="/se-loger" component={SeLoger} />
      <Route path="/consommer" component={Consommer} />
      <Route path="/produire" component={Produire} />
    </Layout>
  )
}

export default App

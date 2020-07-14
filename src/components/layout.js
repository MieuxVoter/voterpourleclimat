import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import Navigation from "./Navigation"
import Banner from "./Banner"
import Footer from "./Footer"
import Timer from "./Timer"
import { UserProvider } from "../services/User"
import * as ROUTES from "../constants/routes"

const Layout = ({ children, banner = true }) => (
  <BrowserRouter>
    <>
      {/*      <Route exact path={ROUTES.LANDING} render={() => <Timer />} /> */}
      {banner ? <Banner /> : <Navigation />}
      <div className="site-content">
        <UserProvider>{children}</UserProvider>
      </div>
      <Footer />
    </>
  </BrowserRouter>
)

export default Layout

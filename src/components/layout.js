import React from "react"
import { BrowserRouter } from "react-router-dom"
import Navigation from "./Navigation"
import Banner from "./Banner"
import Footer from "./Footer"
import { UserProvider } from "../services/User"

const Layout = ({ children, banner = true }) => (
  <BrowserRouter>
    <>
      {banner ? <Banner /> : <Navigation />}
      <div className="site-content">
        <UserProvider>{children}</UserProvider>
      </div>
      <Footer />
    </>
  </BrowserRouter>
)

export default Layout

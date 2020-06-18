import React from "react"
import { BrowserRouter } from "react-router-dom"
import Navigation from "./Navigation"
import Footer from "./Footer"
import { UserProvider } from "../services/User"

const Layout = ({ children }) => (
  <BrowserRouter>
    <>
      <Navigation />
      <div className="site-content">
        <UserProvider>{children}</UserProvider>
      </div>
      <Footer />
    </>
  </BrowserRouter>
)

export default Layout

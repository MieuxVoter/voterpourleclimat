import React from "react"
import { Link } from "react-router-dom"
import { Menu, Responsive } from "semantic-ui-react"
import * as ROUTES from "../../constants/routes"
import NavMobile from "./NavMobile"

const rightItems = [
  <Link to={ROUTES.SE_NOURRIR} class="item">
    Se nourrir
  </Link>,
  <Link to={ROUTES.SE_LOGER} class="item">
    Se loger
  </Link>,
  <Link to={ROUTES.PRODUIRE} class="item">
    Produire et travailler
  </Link>,
  <Link to={ROUTES.CONSOMMER} class="item">
    Consommer
  </Link>,
  <Link to={ROUTES.SE_DEPLACER} class="item">
    Se deplacer
  </Link>,
]

const NavDesktop = ({ items }) => (
  <Responsive minWidth={Responsive.onlyTablet.minWidth}>
    <Menu className="teal" inverted pointing secondary size="large">
      <Menu.Menu position="center">
        {items.map((item, key) => (
          <Menu.Item key={key}>{item} </Menu.Item>
        ))}
      </Menu.Menu>
    </Menu>
  </Responsive>
)

class Navigation extends React.Component {
  render() {
    return (
      <div>
        <NavMobile items={rightItems}></NavMobile>
        <NavDesktop items={rightItems} />
      </div>
    )
  }
}

export default Navigation

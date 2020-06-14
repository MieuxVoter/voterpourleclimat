import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Icon,
  Menu,
  Sidebar,
  Responsive
} from "semantic-ui-react";

import * as ROUTES from '../../constants/routes';


const leftItems = [
  <Link to={ROUTES.LANDING} class="item">Voter pour le climat</Link>
];
const rightItems = [
  <Link to={ROUTES.SE_NOURRIR} class="item">Se nourrir</Link>,
  <Link to={ROUTES.SE_LOGER} class="item">Se loger</Link>,
  <Link to={ROUTES.PRODUIRE} class="item">Produire et travailler</Link>,
  <Link to={ROUTES.CONSOMMER} class="item">Consommer</Link>,
  <Link to={ROUTES.SE_DEPLACER} class="item">Se deplacer</Link>
];

const NavBarMobile = ({
  children,
  leftItems,
  onPusherClick,
  onToggle,
  rightItems,
  visible
}) => (
  <Sidebar.Pushable>
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      items={leftItems}
      vertical
      visible={visible}
    />
    <Sidebar.Pusher
      dimmed={visible}
      onClick={onPusherClick}
      style={{ minHeight: "100vh" }}
    >
      <Menu fixed="top" inverted>
        <Menu.Item onClick={onToggle}>
          <Icon name="sidebar" />
        </Menu.Item>
        <Menu.Menu position="right">
          {rightItems.map((item, key) => <Menu.Item key={key}>{item} </Menu.Item>)}
        </Menu.Menu>
      </Menu>
      {children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

const NavBarDesktop = ({ leftItems, rightItems }) => (
  <Menu fixed="top" inverted>
    {leftItems.map((item, key) => <Menu.Item key={key}>{item} </Menu.Item>)}
    <Menu.Menu position="right">
      {rightItems.map((item, key) => <Menu.Item key={key}>{item} </Menu.Item>)}
    </Menu.Menu>
  </Menu>
);

const NavBarChildren = ({ children }) => (
  <Container style={{ marginTop: "5em" }}>{children}</Container>
);

class Navigation extends React.Component {
  state = {
    visible: false
  };

  handlePusher = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  render() {
    const { children } = this.props;
    const { visible } = this.state;

    return (
      <div>
        <Responsive {...Responsive.onlyMobile}>
          <NavBarMobile
            leftItems={leftItems}
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            rightItems={rightItems}
            visible={visible}
          >
            <NavBarChildren>{children}</NavBarChildren>
          </NavBarMobile>
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <NavBarDesktop leftItems={leftItems} rightItems={rightItems} />
          <NavBarChildren>{children}</NavBarChildren>
        </Responsive>
      </div>
    );
  }
}




export default Navigation;

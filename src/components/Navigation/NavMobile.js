import React, { Component } from "react"
import PropTypes from "prop-types"
import {
  Icon,
  Button,
  Segment,
  Responsive,
  Sidebar,
  Menu,
  Container,
} from "semantic-ui-react"

class NavMobile extends Component {
  state = {}

  handleSidebarHide = () => this.setState({ sidebarOpened: false })

  handleToggle = () => this.setState({ sidebarOpened: true })

  render() {
    const { children, items } = this.props
    const { sidebarOpened } = this.state

    return (
      <Responsive
        as={Sidebar.Pushable}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          className="teal"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          {items.map((item, key) => (
            <Menu.Item key={key}>{item} </Menu.Item>
          ))}
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            textAlign="center"
            style={
              sidebarOpened
                ? { minHeight: "100vh", padding: "1em 0em" }
                : { padding: "1em 0em" }
            }
            vertical
          >
            <Container>
              <Menu className="teal inverted" pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right">Voter Pour Le Climat</Menu.Item>
              </Menu>
            </Container>
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    )
  }
}

NavMobile.propTypes = {
  children: PropTypes.node,
  items: PropTypes.array,
}

export default NavMobile

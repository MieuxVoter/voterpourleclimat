import React, { Component } from "react"
import { Link } from "react-router-dom"
import "react-semantic-toasts/styles/react-semantic-alert.css"
import { Form, Button, Modal } from "semantic-ui-react"
import * as ROUTES from "../../constants/routes"
import { updateUser } from "../../services/actions"
import { withUser } from "../../services/User"

class ConfirmNext extends Component {
  handleNoConfirm = () => {
    const newUser = { ...this.props.user, noConfirm: true }
    updateUser(newUser, this.props.user.uid)
      .then(() => {
        this.props.setUser(newUser)
      })
      .catch(error => console.log(error))
  }

  render() {
    const { isOpened, close } = this.props

    return (
      <Modal dimmer="blurring" open={isOpened} onClose={close}>
        <Modal.Header>
          Félicitations ! Votre vote a été pris en compte !
        </Modal.Header>
        <Modal.Content>
          <p>
            Vous pouvez continuer de voter sur les propositions de ce thème ou
            changer de <Link to={ROUTES.LANDING}>thèmes</Link>.
          </p>
          <p>
            Pensez à{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.facebook.com/sharer/sharer.php?u=https://progress.voterpourleclimat.com/card/${this.props.user.uid}`}
            >
              partager votre avancement
            </a>{" "}
            !
          </p>
          <Form>
            <Form.Checkbox
              name="terms"
              label="Ne plus afficher ce message"
              onChange={this.handleNoConfirm}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Passer aux propositions suivantes"
            onClick={close}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default withUser(ConfirmNext)

import React, { Component } from "react"
import { Button, Header, Message, Modal, Form } from "semantic-ui-react"
import { castVote, saveInfo } from "../services/actions"
import { UserContext } from "../services/User"

class RequestInfo extends Component {
  static contextType = UserContext

  static state = {
    name: "",
    mail: "",
    age: "",
    zipCode: "",
  }

  handleSubmit = () => {
    if (!this.check()) {
      return
    }
    saveInfo(this.state, this.context.user.uid)
    this.props.validate()
  }

  check() {
    // TODO: add error message
    return (
      this.state.name !== "" &&
      this.state.mail !== "" &&
      this.state.age !== "" &&
      this.state.zipCode !== ""
    )
  }

  handleChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { isOpened, close } = this.props

    return (
      <Modal dimmer="blurring" open={isOpened} onClose={close}>
        <Modal.Header>
          Oups... Il nous manque quelques informations pour vous identifier
        </Modal.Header>

        <Modal.Content>
          <Message
            header="Pourquoi collectons-nous ces donnees ?"
            content="Nous avons besoin de verifier que vous ne votez qu'une seule fois. Nous vous demandons egalement votre age et votre code postal pour limiter les biais sociologiques de ce vote."
          />
          <Form>
            <Form.Input
              fluid
              label="Nom"
              placeholder="Veuillez ajouter votre nom"
              id="form-input-name"
              name="name"
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              label="Courriel"
              name="mail"
              placeholder="Veuillez ajouter votre courriel"
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              label="Age"
              name="age"
              placeholder="Veuillez ajouter votre age"
              id="form-input-name"
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              label="Code postal"
              name="zipCode"
              placeholder="Veuillez ajouter votre code postal ou ecrire 00000 si vous residez a l'etranger"
              onChange={this.handleChange}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={close}>
            Fermer
          </Button>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Valider mon vote"
            onClick={this.handleSubmit}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default RequestInfo

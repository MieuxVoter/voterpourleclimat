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
    // TODO: check carefully each field is OK
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
          Afin de valider votre vote, nous vous invitons à remplir les
          informations suivantes
        </Modal.Header>

        <Modal.Content>
          <Message
            header="Pourquoi collectons-nous ces données ?"
            content="Afin que notre voix citoyenne soit entendue, nous utilisons ces données pour construire des résultats représentatifs."
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
              placeholder="Veuillez ajouter votre âge"
              id="form-input-name"
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              label="Code postal"
              name="zipCode"
              placeholder="Veuillez ajouter votre code postal ou écrire 00000 si vous résidez a l'étranger"
              onChange={this.handleChange}
            />
          </Form>
          {
            // TODO add terms of policy
          }
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

import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Button, Message, Modal, Label } from "semantic-ui-react"
import { saveInfo } from "../../services/actions"
import { withUser } from "../../services/User"
import { Form } from "formsy-semantic-ui-react"

class RequestInfo extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false }
  }

  handleSubmit = model => {
    saveInfo(model, this.context.user.uid)
      .then(() => {
        this.props.setUser({ ...this.props.user, ...model })
        this.props.validate()
      })
      .catch(error => console.log(error))
    this.setState({ loading: true })
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
    console.log("STATE", this.state)
    const { loading } = this.state

    const errorLabel = <Label color="red" pointing />

    return (
      <Modal dimmer="blurring" open={isOpened} onClose={close}>
        {loading ? (
          <div class="ui active inverted dimmer">
            <div class="ui text loader">Loading</div>
          </div>
        ) : null}
        <Modal.Header>
          Afin de valider votre vote, nous vous invitons à remplir les
          informations suivantes
        </Modal.Header>

        <Modal.Content>
          <Message
            header="Pourquoi collectons-nous ces données ?"
            content="Afin que notre voix citoyenne soit entendue, nous utilisons ces données pour construire des résultats représentatifs."
          />
          <Form onValidSubmit={this.submit}>
            <Form.Input
              fluid
              label="Nom"
              placeholder="Veuillez ajouter votre nom"
              id="form-input-name"
              validations="isSpecialWords"
              name="name"
            />
            <Form.Input
              fluid
              label="Courriel"
              name="mail"
              validations="isEmail"
              validationErrors={{ isEmail: "L'adresse n'est pas valide" }}
              errorLabel={errorLabel}
              placeholder="Veuillez ajouter votre courriel"
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              label="Age"
              name="age"
              placeholder="Veuillez ajouter votre âge"
              validators="isInt"
              id="form-input-name"
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              label="Code postal"
              name="zipCode"
              placeholder="Veuillez écrire votre code postal ou 00000 si vous résidez a l'étranger"
              validators="isInt"
              onChange={this.handleChange}
            />
            <p>
              Lire la <Link to="/privacy">politique de confidentialité</Link>
            </p>

            <Form.Checkbox
              name="terms"
              label="J'accepte la politique de confidentialité"
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

export default withUser(RequestInfo)

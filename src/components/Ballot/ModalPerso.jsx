import React, { Component } from "react"
import { Link } from "react-router-dom"
import "react-semantic-toasts/styles/react-semantic-alert.css"
import { Form, Button, Message, Modal } from "semantic-ui-react"
import { updateUser } from "../../services/actions"
import * as ROUTES from "../../constants/routes"
import { withUser } from "../../services/User"

class RequestInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: undefined,
      loading: false,
      name: "",
      mail: "",
      age: "",
      zipCode: "",
    }
  }

  check() {
    // TODO: check carefully each field is OK
    return (
      this.state.name !== "" &&
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

  handleSubmit = () => {
    if (!this.check()) {
      this.setState({ error: "Vous devez remplir tous les champs" })
      return
    }

    this.setState({ loading: true })

    const model = {
      name: this.state.name,
      mail: this.state.mail,
      age: this.state.age,
      zipCode: this.state.zipCode,
    }

    updateUser(model, this.props.user.uid)
      .then(() => {
        this.setState({ loading: false })
        this.props.setUser({ ...this.props.user, ...model })
        this.props.validate()
      })
      .catch(error => console.log(error))
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
    const { loading, error } = this.state

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
          {error ? (
            <Message
              error
              header="Problème lors de la validation du formulaire"
              content={error}
            />
          ) : null}

          <Message
            header="Pourquoi collectons-nous ces données ?"
            content="Afin que notre voix citoyenne soit entendue, nous utilisons ces données pour construire des résultats représentatifs. Nous vous enverrons les résultats par courriel."
          />
          <Form>
            <Form.Input
              fluid
              label="Nom complet"
              placeholder="Veuillez ajouter votre nom"
              id="form-input-name"
              name="name"
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              label="Courriel (facultatif, pour recevoir les résultats)"
              name="mail"
              type="email"
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
              placeholder="Veuillez écrire votre code postal ou 00000 si vous résidez a l'étranger"
              onChange={this.handleChange}
            />

            <p>
              Lire la{" "}
              <Link to={ROUTES.PRIVACY_POLICY} target="_blank">
                politique de confidentialité
              </Link>
            </p>
            <Form.Checkbox
              name="terms"
              label="J'accepte la politique de confidentialité"
              onChange={this.handleChange}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={close}>
            Annuler
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

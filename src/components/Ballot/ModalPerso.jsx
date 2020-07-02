import React, { Component } from "react"
import { Link } from "react-router-dom"
import "react-semantic-toasts/styles/react-semantic-alert.css"
import {
  Form,
  Button,
  Select,
  Segment,
  Header,
  Message,
  Modal,
  Portal,
} from "semantic-ui-react"
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
      canDisplayName: "",
      canSendMail: "",
      openPortal: "none",
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
      canDisplayName: this.state.canDisplayName,
      canSendMail: this.state.canSendMail,
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

  handleClose = () => this.setState({ openPortal: "none" })
  handleOpen = () => this.setState({ openPortal: "block" })

  render() {
    const { isOpened, close } = this.props
    const { loading, error } = this.state

    const genderOptions = [
      { key: "f", text: "Féminin", value: "female" },
      { key: "m", text: "Masculin", value: "male" },
      { key: "o", text: "Autre", value: "other" },
    ]

    return (
      <Modal dimmer="blurring" open={isOpened} onClose={close}>
        {loading ? (
          <div class="ui active inverted dimmer">
            <div class="ui text loader">Loading</div>
          </div>
        ) : null}
        <Modal.Header>
          Afin de vérifier que vous n'êtes pas un robot, nous aurions besoin que
          vous remplissiez ce formulaire
        </Modal.Header>

        <Modal.Content>
          {error ? (
            <Message
              error
              header="Problème lors de la validation du formulaire"
              content={error}
            />
          ) : null}

          <Form>
            <Form.Input
              fluid
              label="Nom complet"
              required
              placeholder="Veuillez ajouter votre nom"
              id="form-input-name"
              name="name"
              onChange={this.handleChange}
            />
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Age"
                name="age"
                placeholder="Votre âge"
                id="form-input-name"
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                label="Code postal"
                name="zipCode"
                placeholder="Code postal ou 00000 si vous résidez a l'étranger"
                onChange={this.handleChange}
              />
              <Form.Field
                control={Select}
                options={genderOptions}
                label={{
                  children: "Sexe",
                  htmlFor: "form-select-control-gender",
                }}
                placeholder="Sexe"
                search
                searchInput={{ id: "form-select-control-gender" }}
              />
            </Form.Group>
            <Form.Input
              fluid
              label="Courriel"
              name="mail"
              type="email"
              placeholder="Veuillez ajouter votre courriel"
              onChange={this.handleChange}
            />

            <Form.Checkbox
              name="terms"
              required
              label="J'accepte que mes données personnelles soient stockées pendant la consultation. Elles seront supprimées le 13 août au plus tard."
              onChange={this.handleChange}
            />
            <Form.Checkbox
              name="canDisplayName"
              label="Je veux rendre ma participation publique."
              onChange={this.handleChange}
            />
            <Form.Checkbox
              name="canSendMail"
              label="Je veux recevoir des courriels provenant UNIQUEMENT de VoterPourLeClimat.fr"
              onChange={this.handleChange}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Message
            style={{ display: this.state.openPortal }}
            header="Pourquoi collectons-nous ces données ?"
            content="Afin que notre voix citoyenne soit entendue, nous utilisons ces données pour construire des résultats représentatifs. Nous supprimons vos données personnelles à la fin de la consultation."
          />
          <Button
            content="Pourquoi ce formulaire ?"
            disabled={this.state.openPortal == "block"}
            color="black"
            onClick={this.handleOpen}
          />

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

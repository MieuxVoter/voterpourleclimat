import React from "react"
import { Button, Header, Modal } from "semantic-ui-react"

const ModalInfo = ({
  open,
  close,
  title,
  goal = "Objectif de la proposition a ajouter",
  score = 2,
}) => (
  <Modal dimmer="blurring" open={open} onClose={close}>
    <Modal.Header>{goal}</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Header>{title}</Header>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt.
        </p>
        <p>
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit, sed quia non numquam eius modi tempora
          incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut
          enim ad minima veniam, quis nostrum exercitationem ullam corporis
          suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
          autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
          nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
          voluptas nulla pariatur?
        </p>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <div className="right aligned floating ui teal label">
        {[...Array(3).keys()].map(i => {
          if (i < score) {
            return <em data-emoji="cloud"></em>
          } else {
            return <em className="disabled" data-emoji="cloud"></em>
          }
        })}
        Impact GES
      </div>
      <Button
        className="teal"
        icon="checkmark"
        labelPosition="right"
        content="C'est compris !"
        onClick={close}
      />
    </Modal.Actions>
  </Modal>
)

export default ModalInfo

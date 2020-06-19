import React from "react"
import { Icon, Button } from "semantic-ui-react"

const Social = () => (
  <>
    <Button
      as="a"
      href="https://www.facebook.com/sharer/sharer.php?u=voterpourleclimat.fr"
      className="teal basic"
    >
      <Icon name="facebook" /> Facebook
    </Button>
    <Button
      className="teal basic"
      as="a"
      href="https://twitter.com/intent/tweet?text=Soyons les plus nombreux possibles pour donner une légitimité démocratique aux mesures de la Convention Citoyenne pour le Climat.&url=voterpourleclimat.fr"
    >
      <Icon name="twitter" /> Twitter
    </Button>
  </>
)

export default Social

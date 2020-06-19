import React from "react"
import { Image, Grid, Segment } from "semantic-ui-react"
import MieuxVoter from "../assets/images/mieux-voter.png"
import OnEstPret from "../assets/images/onestpret.png"
import XR from "../assets/images/xr.svg"
import RAC from "../assets/images/rac.png"
import More from "../assets/images/more.png"
import GreenGlobal from "../assets/images/green-global.png"

const partnersList = [
  { name: "Mieux Voter", site: "https://mieuxvoter.fr", logo: MieuxVoter },
  { name: "On Est Prêt", site: "https://www.onestpret.com/", logo: OnEstPret },
  //  {
  //    name: "Extinction Rebellion, groupe Assemblées citoyennes",
  //    site: "https://extinctionrebellion.fr/",
  //    logo: XR,
  //  },
  {
    name: "Réseau Action Climat",
    site: "https://reseauactionclimat.org/",
    logo: RAC,
  },
  {
    name: "Green Global",
    site: "https://www.globalgreen.org/",
    logo: GreenGlobal,
  },
  {
    name: "Et votre organisation ? Envoyez-nous votre logo.",
    site: "mailto:app@mieuxvoter.fr",
    logo: More,
  },
]

const Partners = () => (
  <Grid stackable columns={4}>
    {partnersList.map(partner => (
      <Grid.Column>
        <Segment>
          <Image as="a" href={partner.site} size="medium" src={partner.logo} />
          {/* >
          <Reveal animated="fade">
            <Reveal.Content visible>
              {partner.logo ? <Image src={partner.logo} /> : partner.object}
            </Reveal.Content>

            <Reveal.Content hidden>
              <Image>{partner.name}</Image>
            </Reveal.Content>
          </Reveal>
          */}
        </Segment>
      </Grid.Column>
    ))}
  </Grid>
)

export default Partners

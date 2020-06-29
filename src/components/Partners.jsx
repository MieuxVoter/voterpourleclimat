import React from "react"
import { Image, Grid } from "semantic-ui-react"
import partners from "../constants/partners"

// <div class="ui icon button" data-tooltip="Add users to your feed" data-inverted="">
//   <i class="add icon"></i>
// </div>

const Partners = () => (
  <Grid className="ui stackable padded equal middle aligned six column centered">
    {partners.map((partner, partnerId) => (
      <Grid.Column data-tooltip={partner.name} key={partnerId}>
        <a href={partner.site} rel="noopener noreferrer" target="_blank">
          <Image size="small" centered src={partner.logo} />
        </a>
      </Grid.Column>
    ))}
  </Grid>
)

export default Partners

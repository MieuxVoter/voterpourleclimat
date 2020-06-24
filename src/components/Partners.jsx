import React, { Fragment } from "react"
import { Image, Header } from "semantic-ui-react"
import partners from "../constants/partners"

// <div class="ui icon button" data-tooltip="Add users to your feed" data-inverted="">
//   <i class="add icon"></i>
// </div>

const Partners = () => (
  <div class="ui stackable padded equal middle aligned six column centered grid">
    {partners.map((partner, partnerId) => (
      <div class="column" data-tooltip={partner.name} key={partnerId}>
        <a href={partner.site} rel="noopener noreferrer" target="_blank">
          <Image size="small" src={partner.logo} />
        </a>
      </div>
    ))}
  </div>
)

export default Partners

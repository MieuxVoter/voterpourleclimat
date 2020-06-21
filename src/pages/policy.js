import React from "react"
import { Segment, Grid, Header } from "semantic-ui-react"

const PrivatePolicy = () => (
  <Segment vertical style={{ margin: "5em 0" }}>
    <Grid container stackable verticalAlign="middle">
      <Grid.Row>
        <Grid.Column width={16}>
          <Header>Introduction</Header>
          <p>
            Dans le cadre de son activité, le collectif Voter Pour Le Climat,
            représenté par Pierre-Louis Guhur, résidant au 50 rue Jeanne d'Arc,
            à Paris 75013, est amené à collecter et à traiter des informations
            dont certaines sont qualifiées de "données personnelles". Voter Pour
            Le Climat attache une grande importance au respect de la vie privée,
            et n'utilise que des données de manière responsable et
            confidentielle et dans une finalité précise.
          </p>
          <Header>Données personnelles</Header>
          <p>
            Sur le site web voterpourleclimat.fr, aucune donnée personnelle
            n'est collectée automatiquement, à votre insu. Les données
            personnelles collectées sont celles que vous nous transmettez
            directement, via un formulaire. Sont obligatoires dans le formulaire
            le champs « nom », « âge », « code postal » et « courriel ».
          </p>
          <Header>Utilisation des données</Header>
          <p>
            {" "}
            Les données que vous nous transmettez directement sont utilisées
            dans le but de vérifier que nous ne votiez qu'une seule fois et pour
            mesurer les biais sociologiques de notre consultation.
          </p>
          <p>
            {" "}
            Seulement le responsable du collectif Voter Pour Le Climat a accès à
            ces données, et il s'engage à ne jamais jamais céder ces données à
            un tiers ni à les utiliser à d’autres fins que celles détaillées
            ci-dessus.{" "}
          </p>
          <Header>Base légale</Header>
          <p>
            Les données personnelles ne sont collectées qu’après consentement
            obligatoire de l’utilisateur. Ce consentement est valablement
            recueilli (boutons et cases à cocher), libre, clair et sans
            équivoque.
          </p>
          <Header>Durée de conservation</Header>
          <p>
            Les données seront sauvegardées durant une durée maximale de 1 mois.
          </p>
          <Header>Cookies</Header>
          <p>Aucun cookie de type "web analytics" est utilisé.</p>
          <p>
            Nous utilisons cependant un cookie de Firebase pour s'assurer que
            chaque participant ne vote qu'une seule fois. Celui-ci ne contient
            que les informations que personnelles collectées directement.{" "}
          </p>
          <p>
            Vous avez le droit de consultation, demande de modification ou
            d’effacement sur l’ensemble de vos données personnelles. Vous pouvez
            également retirer votre consentement au traitement de vos données.
          </p>
          <Header>Responsable du collectif Voter Pour Le Climat </Header>
          <p>
            Pierre-Louis Guhur - 06 43 13 87 96 - pierre.louis.guhur@gmail.com
          </p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
)

export default PrivatePolicy

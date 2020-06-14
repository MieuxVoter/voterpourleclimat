import React from 'react';
import {
  Segment,
  Grid,
  Header,
  Container,
  List
} from 'semantic-ui-react';


const Footer = () => (
  <Segment inverted vertical style={{ padding: '5em 0em' }}>
    <Container>
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='About' />
            <List link inverted>
              <List.Item as='a'>Sitemap</List.Item>
              <List.Item as='a'>Nous contacter</List.Item>
              <List.Item as='a'>Mentions légales</List.Item>
              <List.Item as='a'>
                <a href="https://github.com/MieuxVoter/voterpourleclimat">
                  Code source
                </a>
              </List.Item>
              <List.Item as='a'>Kit média</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header inverted as='h4' content='Partenaires' />
            <List link inverted>
              <List.Item as='a'></List.Item>
              <List.Item as='a'>Mieux Voter</List.Item>
              <List.Item as='a'>On est prêt</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as='h4' inverted>
              Partager le vote
            </Header>
            <p>
              Soyons les plus nombreux possibles pour donner une légitimité démocratique aux mesures de la Convention Citoyenne pour le Climat.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
);

export default Footer;

import React from 'react';
import {
	Segment,
	Grid,
	Header,
	Image, 
	Button,
	Container,
	List
} from 'semantic-ui-react';
import Heading from '../components/HomeHeading.jsx';


const Home = () => (
  <>
    <Heading />
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              La Convention Citoyenne pour le climat est un groupe de 150 citoyen·nes français·es, tiré·es au sort.
            </Header>
            <p style={{ fontSize: '1.33em' }}>
 Ce panel représentatif a défini une série de mesures visant à réduire les émissions françaises de gaz à effet de serre de 40 % d'ici 2030 dans un esprit de justice social.
	    </p>
            <p style={{ fontSize: '1.33em' }}>
	      Nous vous proposons sur ce site de donner votre avis sur ces mesures. Soyons les plus nombreux possibles à voter pour donner une légitimité démocratique à cette série de mesures.
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image bordered rounded size='large' src='/images/wireframe/white-image.png' />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign='center'>
	    <a href="https://www.conventioncitoyennepourleclimat.fr">
              <Button size='huge'>Détails sur la Convention Citoyenne</Button>
	    </a>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

  </>
);

export default Home;

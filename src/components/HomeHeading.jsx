import React from 'react';
import { Container, Header, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Donnons une voix à la Convention Citoyenne pour le Climat.'
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />

    <Link to="/vote/">
      <Button primary size='huge'>
         Voter
        <Icon name='right arrow' />
      </Button>
    </Link>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

export default HomepageHeading;

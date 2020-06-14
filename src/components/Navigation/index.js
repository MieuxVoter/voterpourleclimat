import React from 'react';
import { Link } from 'gatsby';

import * as ROUTES from '../../constants/routes';


const Navigation = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Voter pour le climat</Link>
    </li>
    <li>
      <Link to={ROUTES.SE_NOURRIR}>Se nourrir</Link>
    </li>
    <li>
      <Link to={ROUTES.SE_LOGER}>Se loger</Link>
    </li>
    <li>
      <Link to={ROUTES.PRODUIRE}>Produire et travailler</Link>
    </li>
    <li>
      <Link to={ROUTES.CONSOMMER}>Consommer</Link>
    </li>
    <li>
      <Link to={ROUTES.SE_DEPLACER}>Se deplacer</Link>
    </li>
  </ul>
);


export default Navigation;

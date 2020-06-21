import * as ROUTES from "../constants/routes.js"
import * as TITLES from "../constants/titles"
import * as PROPOSALS from "../constants/proposals"

export const SE_NOURRIR = {
  name: "Se nourrir",
  icon: "utensils",
  collection: "seNourrir",
  to: ROUTES.SE_NOURRIR,
  title: TITLES.SE_NOURRIR,
  proposals: PROPOSALS.SE_NOURRIR,
  description:
    "19 % des émissions de GES en France sont dues à l’agriculture. Les engrais azotés constituent plus de 40 % des émissions de gaz à effet de serre de l’agriculture. Ils ont également un impact important en termes de pollution de l’air, avec un effet sur la santé.",
}

export const SE_LOGER = {
  name: "Se loger",
  icon: "home",
  to: ROUTES.SE_LOGER,
  collection: "seLoger",
  title: TITLES.SE_LOGER,
  proposals: PROPOSALS.SE_LOGER,
  description:
    "19 % des émissions de gaz à effet de serre en France sont dues à la mauvaise isolation des bâtiments.",
}

export const SE_DEPLACER = {
  name: "Se déplacer",
  icon: "truck pickup",
  to: ROUTES.SE_DEPLACER,
  collection: "seDeplacer",
  title: TITLES.SE_DEPLACER,
  proposals: PROPOSALS.SE_DEPLACER,
  description:
    "31 % des émissions de gaz à effet de serre en France sont dues au transport.",
}

export const CONSOMMER = {
  name: "Consommer",
  icon: "shopping cart",
  to: ROUTES.CONSOMMER,
  collection: "consommer",
  title: TITLES.CONSOMMER,
  proposals: PROPOSALS.CONSOMMER,
  description:
    "Les dépenses de publicité et de communication du secteur automobile ont représenté en 2019 en France 4,3 milliards d’euros pour promouvoir l'usage d'énergies fossiles.",
}

export const PRODUIRE = {
  name: "Produire et travailler",
  icon: "industry",
  to: ROUTES.PRODUIRE,
  collection: "produire",
  title: TITLES.PRODUIRE,
  proposals: PROPOSALS.PRODUIRE,
  description:
    "En France, les études des scénarios de transition écologique calculent un potentiel de 280 000 à 400 000 créations d’emplois d’ici 2030.",
}

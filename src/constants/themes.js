import * as ROUTES from "../constants/routes.js"
import * as TITLES from "../constants/titles"
import * as PROPOSALS from "../constants/proposals"
import * as OBJECTIVES from "../constants/objectives"

export const SE_NOURRIR = {
  name: "Se nourrir",
  icon: "utensils",
  collection: "seNourrir",
  to: ROUTES.SE_NOURRIR,
  title: TITLES.SE_NOURRIR,
  proposals: PROPOSALS.SE_NOURRIR,
  objectives: OBJECTIVES.SE_NOURRIR,
  description:
    "Se nourrir est un besoin vital qui génère de nombreuses émissions de gaz à effet de serre. Comment réinventer un système alimentaire durable et accessible à tous d’ici 2030 ?",
  groupUrl:
    "https://propositions.conventioncitoyennepourleclimat.fr/se-nourrir-2/",
}

export const SE_LOGER = {
  name: "Se loger",
  icon: "home",
  to: ROUTES.SE_LOGER,
  collection: "seLoger",
  title: TITLES.SE_LOGER,
  proposals: PROPOSALS.SE_LOGER,
  objectives: OBJECTIVES.SE_LOGER,
  description:
    "Pour réduire les émissions de gaz à effet de serre dans l’habitat, il faut revoir les bâtiments dans leur ensemble. Comment se loger dans une ville végétalisée, rénovée et moins polluante ?",
  groupUrl:
    "https://propositions.conventioncitoyennepourleclimat.fr/se-loger-2/",
}

export const SE_DEPLACER = {
  name: "Se déplacer",
  icon: "truck pickup",
  to: ROUTES.SE_DEPLACER,
  collection: "seDeplacer",
  title: TITLES.SE_DEPLACER,
  proposals: PROPOSALS.SE_DEPLACER,
  objectives: OBJECTIVES.SE_DEPLACER,
  description:
    "Les déplacements représentent aujourd’hui 30% des émissions de gaz à effet de serre en France. Mieux se déplacer personnellement et transporter autrement les marchandises est essentiel.",
  groupUrl:
    "https://propositions.conventioncitoyennepourleclimat.fr/se-deplacer-2/",
}

export const CONSOMMER = {
  name: "Consommer",
  icon: "shopping cart",
  to: ROUTES.CONSOMMER,
  collection: "consommer",
  title: TITLES.CONSOMMER,
  proposals: PROPOSALS.CONSOMMER,
  objectives: OBJECTIVES.CONSOMMER,
  description:
    "Nos habitudes de consommation voire de surconsommation, ont un fort impact sur l’environnement. Une consommation plus sobre et vertueuse est possible quel que soit son pouvoir d’achat.",
  groupUrl:
    "https://propositions.conventioncitoyennepourleclimat.fr/consommer//",
}

export const PRODUIRE = {
  name: "Produire et travailler",
  icon: "industry",
  to: ROUTES.PRODUIRE,
  collection: "produire",
  title: TITLES.PRODUIRE,
  proposals: PROPOSALS.PRODUIRE,
  objectives: OBJECTIVES.PRODUIRE,
  description:
    "Le passage à une société décarbonée implique de transformer pleinement l’appareil de production et les métiers. Travailler et produire différemment s’impose.",
  groupUrl:
    "https://propositions.conventioncitoyennepourleclimat.fr/produire-et-travailler/",
}

export const CONSTITUTION = {
  name: "Constitution",
  icon: "feather",
  collection: "constitution",
  to: ROUTES.CONSTITUTION,
  title: TITLES.CONSTITUTION,
  proposals: PROPOSALS.CONSTITUTION,
  objectives: OBJECTIVES.CONSTITUTION,
  description:
    "Nous proposons une modification de la Constitution du 4 octobre 1958 afin de mieux garantir dans le texte fondamental de la République française, la lutte contre le dérèglement climatique et pour le respect de l’environnement devenus des enjeux vitaux pour le système vivant.",
  groupUrl:
    "https://propositions.conventioncitoyennepourleclimat.fr/propositions-de-revision-de-la-constitution/",
}

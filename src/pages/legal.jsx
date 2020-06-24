import React from "react"
import { Segment, Container, Header } from "semantic-ui-react"
import partnerLists from "../constants/partners"

const Legal = () => (
  <Segment vertical>
    <Container verticalAlign="middle">
      <Header>Éditeur et responsable de la publication</Header>

      <p>
        Collectif Voter Pour Le Climat : collectif informel, co-porté par les
        partenaires :{" "}
        {partnerLists.map(partner =>
          partner.site.startsWith("mailto") ? null : `${partner.name}, `
        )}
      </p>

      <p>
        Les propos tenus sur ce site ne représentent que l’opinion de leur
        auteur et n’engagent pas les sociétés, entreprises ou collectifs
        auxquels il peut être associé ou employé, et en particulier de la
        Convention Citoyenne pour le Climat.
      </p>

      <Header>Hébergement</Header>

      <p>
        Netlify
        <br />
        610 22nd Street, Suite 315,
        <br />
        San Francisco, CA 94107 Site web : https://www.netlify.com
      </p>

      <Header>Protection des données personnelles</Header>

      <p>
        Aucune donnée personnelle n’est collectée à l’insu des visiteurs du site
        voterpourleclimat.fr.
      </p>

      <p>
        En aucun cas ces données ne seront cédées ou vendues à des tiers. Elles
        ne sont collectées que : dans le cadre des votes (nom complet, courriel,
        age, code postal), afin de vérifier que chaque participant ne vote
        qu'une seule fois, de transmettre les résultats et de calculer des biais
        dans la consultation.
      </p>

      <p>
        Les seules adresses susceptibles d’être collectées sont des adresses
        postales et électroniques. Elles ne sont recueillies par l’éditeur qu’à
        la suite de leur communication volontaire par les internautes souhaitant
        recevoir une réponse.
      </p>

      <p>
        Les informations qui vous concernent sont destinées uniquement à
        l’éditeur. Elles ne sont pas transmises à des tiers. En application de
        la loi du 6 août 2004 (« informatique et libertés »), vous disposez d’un
        droit d’accès, de modification et de suppression des informations qui
        vous concernent.
      </p>
      <p>
        Pour exercer ce droit, et pour toute question relative au site, nous
        vous invitons à nous contacter par courrier électronique, par voie
        postale ou par téléphone.
      </p>

      <Header>Suivi sur le web : cache et cookies, historique</Header>

      <p>
        Lorsque vous visitez un site web, des traces de votre navigation sur
        internet sont enregistrées dans votre propre ordinateur, dans les
        équipements du réseau internet (fournisseurs d’accès) et sur des
        serveurs.
      </p>

      <p>
        Votre navigateur conserve une copie des pages que vous avez parcourues
        récemment (« le cache », moyen astucieux d’optimiser les temps de
        chargement et désengorger le réseau). Il garde aussi un historique des
        adresses que vous avez entrées via la barre d’adresse.
      </p>

      <p>
        Les cookies font également parties des traces qui restent de vos
        navigations. Un cookie est un fichier texte déposé sur votre disque dur
        par le domaine que vous visitez. Il peut contenir plusieurs données
        comme le nom du serveur qui l’a déposé, un identifiant sous forme de
        numéro unique, une date d’expiration… Un serveur y accède pour lire et
        enregistrer ces informations.
      </p>

      <p>
        Les cookies jouent plusieurs rôles. Ils facilitent votre navigation,
        stockent vos préférences, rendent l’interaction entre vous et le site
        internet plus rapide et plus facile. Sans cookie, vous serez un nouveau
        venu à chaque fois que vous ouvrirez une page du site. Par exemple, si
        vous entrez vos données en tant qu'électeur sur une page et que vous
        passez sur une autre page, le site ne vous reconnaîtra pas et ne sera
        pas capable de vous considérer comme enregistré.
      </p>

      <p>
        Certains sites utilisent aussi les cookies pour cibler leur publicité ou
        leurs campagnes de marketing en se basant, par exemple, sur votre lieu
        de résidence ou vos habitudes d’achats ou de navigation sur Internet. Ce
        n’est pas le cas du site voterpourleclimat.fr
      </p>

      <p>
        Certains cookies sont liés au site que vous regardez, d’autres dépendent
        de sites extérieurs qui gèrent du contenu sur la page que vous regardez
        (cookies de sites tiers). Par exemple, votre site internet peut utiliser
        les services d’une entreprise de statistiques qui va utiliser ses
        propres cookies pour pouvoir compter les visiteurs.
      </p>

      <Header>Limitation de responsabilité</Header>

      <p>
        Ce portail comporte des liens hypertextes vers d’autres sites qui n’ont
        pas été développés par le collectif Voter Pour Le Climat.
      </p>

      <p>
        Le contenu mis à disposition sur le site est fourni à titre informatif.
        L’existence d’un lien de ce site vers un autre site ne constitue pas une
        validation de ce site ou de son contenu.
      </p>

      <Header>Clause de non responsabilité</Header>

      <p>
        Les informations proposées sur ce site web sont de nature indicative,
        non contractuelle et ne visent en aucun cas la situation particulière
        d’une personne physique ou morale.
      </p>

      <p>
        Nous nous engageons à transmettre les résultats de la consultation sans
        les altérer. Toutefois, nous nous réservons le droit de modifier le
        contenu de ce site à tout moment sans préavis. Toute erreur signalée
        sera immédiatement corrigée. L’éditeur n’apporte aucune garantie quant à
        l’utilisation des informations fournies sur son site web. Il ne sera pas
        responsable du préjudice ou dommage pouvant résulter de l’utilisation
        des informations présentes sur le site, ni d’erreurs ou omissions dans
        celles-ci, de défauts ou d’interruptions dans leur fourniture ou de
        l’indisponibilité de tout ou partie de celles-ci. Des liens présents sur
        ce site web orientent les utilisateurs sur d’autres sites dont le
        contenu ne peut engager la responsabilité de l’éditeur. Ces liens
        ouvrent une nouvelle fenêtre du navigateur afin de dissocier ces sites
        web de celui de l’éditeur.
      </p>

      <Header>Propriété, droits de reproduction</Header>

      <p>
        Tous les éléments de ce site sont protégés par le droit d’auteur et les
        droits de propriété intellectuelle (logo, graphisme, images, textes)
        selon la licence MIT. Toute utilisation ou extraction d’éléments du site
        est sanctionnée pénalement par le délit de contrefaçon.
      </p>
    </Container>
  </Segment>
)

export default Legal

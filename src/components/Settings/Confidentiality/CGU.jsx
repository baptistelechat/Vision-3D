import React from "react";
// MATERIAL UI
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
// MATERIAL UI ICON
import CloseIcon from "@mui/icons-material/Close";
import SubjectIcon from "@mui/icons-material/Subject";
// OTHER
import { useNavigate } from "react-router-dom";

const CGU = ({ openCGU, setOpenCGU, openConfidentiality }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClose = () => {
    setOpenCGU(false);
    navigate("");
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={handleClose}
      open={openCGU}
      hideBackdrop={openConfidentiality}
    >
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={1}
          sx={{ mt: "8px" }}
        >
          <SubjectIcon fontSize="large" />
          <h3>Conditions générales d'utilisation (CGU)</h3>
        </Stack>
        <IconButton
          onClick={handleClose}
          style={{ right: "12px", top: "20px", position: "absolute" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ mt: "16px", mb: "16px" }}>
        <DialogContentText id="alert-dialog-description" sx={{ mb: "32px" }}>
          <h4>
            Conditions générales d'utilisation du site Internet : VISION 3D
          </h4>
          <br></br>
          <p>
            Le présent document a pour objet de définir les modalités et
            conditions dans lesquelles d’une part, les ÉDITEURS (M. Baptiste
            LECHAT et M. Matthieu LECHAT), mettent à la disposition de ses
            utilisateurs le site (nommée ci-après : Vision 3D), et les services
            disponibles sur le site et d’autre part, la manière par laquelle
            l’utilisateur accède au site et utilise ses services.
          </p>
          <br></br>
          <p>
            Toute connexion au site est subordonnée au respect des présentes
            conditions.
          </p>
          <br></br>
          <p>
            Pour l’utilisateur, le simple accès au site des ÉDITEURS à l’adresse
            URL «{" "}
            <a href="https://vision-3d.vercel.app/">vision-3d.vercel.app</a> »
            implique l’acceptation de l’ensemble des conditions décrites
            ci-après.
          </p>
          <br></br>
          <h4>Propriété intellectuelle</h4>
          <br></br>
          <p>
            La structure générale du site VISION 3D, ainsi que les textes,
            graphiques, images, sons et vidéos la composant, sont la propriété
            des ÉDITEURS ou de ses partenaires. Toute représentation et/ou
            reproduction et/ou exploitation partielle ou totale des contenus et
            services proposés par le site VISION 3D, par quelque procédé que ce
            soit, sans l'autorisation préalable et par écrit des ÉDITEURS et/ou
            de ses partenaires est strictement interdite et serait susceptible
            de constituer une contrefaçon au sens des articles L 335-2 et
            suivants du Code de la propriété intellectuelle. Les pages du site
            VISION 3D ne peux pas être utilisées à des fins commerciales et
            publicitaires.
          </p>
          <br></br>
          <h4>Liens hypertextes</h4>
          <br></br>
          <p>
            Le site VISION 3D peut contenir des liens hypertextes vers d’autres
            sites présents sur le réseau Internet. Les liens vers ces autres
            ressources vous ouvrent un nouvel onglet dans votre navigateur
            Internet et ne vous font pas quitter le site VISION 3D.
          </p>
          <br></br>
          <p>
            Il est possible de créer un lien vers la page de présentation de ce
            site sans autorisation expresse des ÉDITEURS. Aucune autorisation ou
            demande d’information préalable ne peut être exigée par l’éditeur à
            l’égard d’un site qui souhaite établir un lien vers le site de
            l’éditeur. Il convient toutefois d’afficher ce site dans une
            nouvelle fenêtre du navigateur. Cependant, les ÉDITEURS se réservent
            le droit de demander la suppression d’un lien qu’il estime non
            conforme à l’objet du site VISION 3D.
          </p>
          <br></br>
          <h4>Responsabilité de l’éditeur</h4>
          <br></br>
          <p>
            Les informations et/ou documents figurant sur ce site et/ou
            accessibles par ce site proviennent de sources considérées comme
            étant fiables.
          </p>
          <br></br>
          <p>
            Toutefois, ces informations et/ou documents sont susceptibles de
            contenir des inexactitudes techniques et des erreurs typographiques.
          </p>
          <br></br>
          <p>
            Les ÉDITEURS se réservent le droit de les corriger, dès que ces
            erreurs sont portées à sa connaissance.
          </p>
          <br></br>
          <p>
            Il est fortement recommandé de vérifier l’exactitude et la
            pertinence des informations et/ou documents mis à disposition sur ce
            site.
          </p>
          <br></br>
          <p>
            Les informations et/ou documents disponibles sur ce site sont
            susceptibles d’être modifiés à tout moment, et peuvent avoir fait
            l’objet de mises à jour. En particulier, ils peuvent avoir fait
            l’objet d’une mise à jour entre le moment de leur téléchargement et
            celui où l’utilisateur en prend connaissance.
          </p>
          <br></br>
          <p>
            L’utilisation des informations et/ou documents disponibles sur ce
            site se fait sous l’entière et seule responsabilité de
            l’utilisateur, qui assume la totalité des conséquences pouvant en
            découler, sans que l’ÉDITEUR puisse être recherché à ce titre, et
            sans recours contre ce dernier.
          </p>
          <br></br>
          <p>
            Les ÉDITEURS ne pourront en aucun cas être tenu responsable de tout
            dommage de quelque nature qu’il soit résultant de l’interprétation
            ou de l’utilisation des informations et/ou documents disponibles sur
            ce site.
          </p>
          <br></br>
          <h4>Accès au site</h4>
          <br></br>
          <p>
            Les ÉDITEURS s’efforcent de permettre l’accès au site 24 heures sur
            24, 7 jours sur 7, sauf en cas de force majeure ou d’un événement
            hors du contrôle des ÉDITEURS, et sous réserve des éventuelles
            pannes et interventions de maintenance nécessaires au bon
            fonctionnement du site et des services.
          </p>
          <br></br>
          <p>
            Par conséquent, les ÉDITEURS ne peuvent garantir une disponibilité
            du site et/ou des services, une fiabilité des transmissions et des
            performances en termes de temps de réponse ou de qualité. Il n’est
            prévu aucune assistance technique vis à vis de l’utilisateur que ce
            soit par des moyens électronique ou téléphonique.
          </p>
          <br></br>
          <p>
            La responsabilité des ÉDITEURS ne saurait être engagée en cas
            d’impossibilité d’accès à ce site et/ou d’utilisation des services.
          </p>
          <br></br>
          <p>
            Par ailleurs, les ÉDITEURS peuvent être amené à interrompre le site
            ou une partie des services, à tout moment sans préavis, le tout sans
            droit à indemnités. L’utilisateur reconnaît et accepte que les
            ÉDITEURS ne soient pas responsables des interruptions, et des
            conséquences qui peuvent en découler pour l’utilisateur ou tout
            tiers.
          </p>
          <br></br>
          <h4>Modification des conditions d’utilisation</h4>
          <p>
            Les ÉDITEURS se réserve la possibilité de modifier, à tout moment et
            sans préavis, les présentes conditions d’utilisation afin de les
            adapter aux évolutions du site et/ou de son exploitation.
          </p>
          <br></br>
          <h4>Règles d'usage d'Internet</h4>
          <br></br>
          <p>
            L’utilisateur déclare accepter les caractéristiques et les limites
            d’Internet, et notamment reconnaît que :
          </p>
          <br></br>
          <p>
            Les ÉDITEURS n’assument aucune responsabilité sur les services
            accessibles par Internet et n’exerce aucun contrôle de quelque forme
            que ce soit sur la nature et les caractéristiques des données qui
            pourraient transiter par l’intermédiaire de son centre serveur.
          </p>
          <br></br>
          <p>
            L’utilisateur reconnaît que les données circulant sur Internet ne
            sont pas protégées notamment contre les détournements éventuels. La
            communication de toute information jugée par l’utilisateur de nature
            sensible ou confidentielle se fait à ses risques et périls.
          </p>
          <br></br>
          <p>
            L’utilisateur reconnaît que les données circulant sur Internet
            peuvent être réglementées en termes d’usage ou être protégées par un
            droit de propriété.
          </p>
          <br></br>
          <p>
            L’utilisateur est seul responsable de l’usage des données qu’il
            consulte, interroge et transfère sur Internet.
          </p>
          <br></br>
          <p>
            L’utilisateur reconnaît que les ÉDITEURS ne disposent d’aucun moyen
            de contrôle sur le contenu des services accessibles sur Internet.
          </p>
          <br></br>
          <h4>Droit applicable</h4>
          <br></br>
          <p>
            Tant le présent site que les modalités et conditions de son
            utilisation sont régis par le droit français, quel que soit le lieu
            d’utilisation. En cas de contestation éventuelle, et après l’échec
            de toute tentative de recherche d’une solution amiable, les
            tribunaux français seront seuls compétents pour connaître de ce
            litige.
          </p>
          <br></br>
          <p>
            Tant le présent site que les modalités et conditions de son
            utilisation sont régis par le droit français, quel que soit le lieu
            d’utilisation. En cas de contestation éventuelle, et après l’échec
            de toute tentative de recherche d’une solution amiable, les
            tribunaux français seront seuls compétents pour connaître de ce
            litige.
          </p>
          <br></br>
          <p>
            Pour toute question relative aux présentes conditions d’utilisation
            du site, vous pouvez nous écrire à l’adresse suivante :
          </p>
          <br></br>
          <li>
            <a href="mailto:baptistelechat@outlook.fr">
              baptistelechat@outlook.fr
            </a>
          </li>
          <li>
            <a href="mailto:matthieulechat@outlook.fr">
              matthieulechat@outlook.fr
            </a>
          </li>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default CGU;

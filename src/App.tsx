import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonItem,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import BusArrival from './pages/BusArrival';
import packageJson from '../package.json';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/busarrival">
            <BusArrival />
          </Route>
          <Route exact path="/">
            <Redirect to="/busarrival" />
          </Route>
        </IonRouterOutlet>
        <IonItem slot="bottom"></IonItem>
        <IonTabBar slot="bottom">
          <IonTabButton>
            <IonLabel className="label-copyright">
              <a
                href="https://www.linkedin.com/in/nurdin-effendi-aritonang-4a7b9a8"
                target="_blank"
              >
                by effendi aritonang
              </a>
            </IonLabel>
            <IonLabel>v{packageJson.version}</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;

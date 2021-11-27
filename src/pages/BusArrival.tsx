import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonImg,
  IonIcon,
} from '@ionic/react';
import { bus } from 'ionicons/icons';

import React, { useState } from 'react';
import axios from 'axios';
import packageJson from '../../package.json';

const BusArrival: React.FC = () => {
  interface BusService {
    nextBus1: string;
    nextBus2: string;
    serviceNo: string;
  }

  const [busService, setBusService] = useState<BusService[]>();
  const [busCode, setBusCode] = useState('');
  const [form, setForm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  let btnSubmitCaption = 'Check Bus Arrival';
  if (form === 'submitting') {
    btnSubmitCaption = 'Checking...';
  }

  const err = (message: string) => {
    setForm('buscodeerror');
    setErrorMessage(message);
    setBusService([]);
  };

  const onSubmit = async () => {
    if (form === 'submitting') {
      // to prevent multiple submission
      return;
    }

    if (busCode === '') {
      err('You must provide bust stop code!');
      return;
    }

    setForm('submitting');

    try {
      const response = await axios.post(
        `${packageJson.serviceUrl}/arrival?buscode=${busCode}`
      );

      if (response.status === 200 && response.data) {
        setBusService(response.data);
      }
    } catch (error) {
      err('Unable to find bus stop code');
      return;
    }

    setForm('complete');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonLabel className="ion-padding">
            <IonIcon icon={bus} size="small" />
            &nbsp;
            <b className="label-title">SINGAPORE BUS ARRIVAL</b>
          </IonLabel>
        </IonToolbar>
      </IonHeader>
      <br />
      <IonItem>
        {form === 'buscodeerror' && (
          <IonLabel position="stacked">
            <IonText color="danger">{errorMessage}</IonText>
          </IonLabel>
        )}
        <IonLabel position="stacked" className="label-caption">
          Bus stop code:
        </IonLabel>
        <IonInput
          id="buscode"
          required
          type="number"
          onIonChange={(e) => setBusCode(e.detail.value!)}
          value={busCode}
          placeholder="Enter bus stop code"
        />
      </IonItem>
      <IonButton
        expand="block"
        type="submit"
        class="ion-padding"
        onClick={onSubmit}
      >
        {btnSubmitCaption}
      </IonButton>
      <IonContent className="ion-padding">
        <IonGrid>
          {(!busService || busService.length == 0) && (
            <IonRow>
              <IonCol offset="1.8" size="10">
                <br />
                <IonImg src="/assets/bus.png" className="img-width" />
              </IonCol>
            </IonRow>
          )}
          {busService && busService.length > 0 && (
            <IonRow>
              <IonCol className="ion-text-left">
                <u>Bus No.</u>
              </IonCol>
              <IonCol className="ion-text-right">
                <u>Following</u>
              </IonCol>
              <IonCol className="ion-text-right">
                <u>Upcoming</u>
              </IonCol>
            </IonRow>
          )}
          {busService?.map((service, index) => {
            return (
              <IonRow key={index}>
                <IonCol className="ion-text-left">{service.serviceNo}</IonCol>
                <IonCol className="ion-text-right">{service.nextBus1}</IonCol>
                <IonCol className="ion-text-right">{service.nextBus2}</IonCol>
              </IonRow>
            );
          })}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default BusArrival;

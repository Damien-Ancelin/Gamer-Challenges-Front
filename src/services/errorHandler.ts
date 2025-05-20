import axios from 'axios';
import { toast } from 'react-toastify';

const isProduction = import.meta.env.VITE_ENV !== 'production';

const errorNoHandledMessage =
  "Une erreur s'est produite. Veuillez réessayer plus tard.";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      toast.error(error.response.data.message);
    }
    if (error.status === 400) {
      toast.error('Requête invalide');
    }
    if (error.status === 401) {
      toast.error("Vous n'êtes pas connecté");
    }
    if (error.status === 403) {
      toast.error("Vous n'avez pas accès à cette ressource");
    }
    if (error.status === 404) {
      toast.error('Ressource non trouvée');
    }
    if (error.status === 500) {
      toast.error('Erreur interne du serveur');
    }
    if (error.status === 503) {
      toast.error('Service temporairement indisponible');
    }
    if (error.status === 504) {
      toast.error("Délai d'attente de la requête dépassé");
    }
    return Promise.reject(error);
  },
);

export default function errorHandlerAxios(error: unknown) {
  // Api response error Validation
  if (axios.isAxiosError(error) && error?.response?.data.validationErrors) {
    console.log('Validation errors: dans la fonction');
    for (const index of error.response.data.validationErrors) {
      toast.error(index.errorMessage);
      if (isProduction) {
        console.error('Axios Error code:', error.response.status);
        console.error('Axios Error message:', error.message);
        console.error('Axios Error data:', error);
      }
    }
    return;
  }
  // Api response error custom
  if (axios.isAxiosError(error) && error?.response?.data.success === false) {
    toast.error(error.response.data.message);
    if (isProduction) {
      console.error('Axios Error code:', error.response.status);
      console.error('Axios Error message:', error.message);
      console.error('Axios Error data:', error);
    }
    return;
  }

  // API unexepted error
  if (axios.isAxiosError(error) && error?.response?.data.error) {
    const status = error.response.status;
    switch (status) {
      case 400:
        toast.error('Requête invalide');
        break;
      case 401:
        toast.error("Vous n'êtes pas connecté");
        break;
      case 403:
        toast.error("Vous n'avez pas accès à cette ressource");
        break;
      case 404:
        toast.error('Ressource non trouvée');
        break;
      case 500:
        toast.error('Erreur interne du serveur');
        break;
      case 503:
        toast.error('Service temporairement indisponible');
        break;
      case 504:
        toast.error("Délai d'attente de la requête dépassé");
        break;
      default:
        // Message d'erreur par défaut pour les autres statuts
        toast.error(errorNoHandledMessage);
    }
  }

  // Others error
  if (error instanceof Error) {
    toast.error(errorNoHandledMessage);
    if (isProduction) {
      console.error('Error message:', error.message);
    }
  } else {
    toast.error(errorNoHandledMessage);
    if (isProduction) {
      console.error('Error message:', error);
    }
  }
}

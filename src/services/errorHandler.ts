interface ValidationError {
  errorMessage: string;
}

interface errorHandlerIn {
  status: number;
  errorData: {
    sucess: boolean;
    message: string;
    validationErrors?: ValidationError[];
  };
}
export const errorHandler = ({ status, errorData }: errorHandlerIn): string => {
  const { message, validationErrors } = errorData;

  switch (status) {
    case 400:
      if (validationErrors && validationErrors.length > 0) {
        const validationMessages = validationErrors
          .map((error) => error.errorMessage)
          .join(', ');
        return `Error ${status}: ${validationMessages}` || 'Bad Request';
      }
      return `Error ${status}: ${message}` || 'Bad Request';

    case 401:
      return `Error ${status}: ${message}` || 'Unauthorized';

    case 403:
      return `Error ${status}: ${message}` || 'Forbidden';

    case 404:
      return `Error ${status}: ${message}` || 'Not Found';

    case 409:
      return `Error ${status}: ${message}` || 'Conflict';

    case 500:
      return 'Internal Server Error';

    default:
      return 'Une erreur inconnue est survenue.';
  }
};

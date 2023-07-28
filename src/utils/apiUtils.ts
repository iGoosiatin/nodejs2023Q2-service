export const buildNotFoundDescrition = (entity: string) =>
  `${entity} not found`;

export const buildInvalidUuidDescription = (id = 'id') =>
  `Bad request. ${id} is not valid UUID`;

export const buildInvalidUuidOrBodyDescription = (id = 'id') =>
  `Bad request. ${id} is not valid UUID or missing required properties in the body`;

export const buildDeletionDescription = (entity: string) => `${entity} deleted`;

export const buildCreationDescription = (entity: string) => `${entity} created`;

export const successOperationDescription = 'Successful operation';

export const missingPropertiesDescription =
  'Bad request. Missing required properties in the body';

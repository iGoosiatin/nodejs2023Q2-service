export const buildNotFoundDescription = (entity: string) =>
  `${entity} not found`;

export const buildInvalidUuidDescription = (id = 'id') =>
  `Bad request. ${id} is not valid UUID`;

export const buildInvalidUuidOrBodyDescription = (id = 'id') =>
  `Bad request. ${id} is not valid UUID or missing required properties in the body`;

export const buildDeletionDescription = (entity: string) => `${entity} deleted`;

export const buildCreationDescription = (entity: string) => `${entity} created`;

export const buildAddToFavDescription = (entity: string) =>
  `${entity} added to favorites`;

export const buildRemoveFromFavDescription = (entity: string) =>
  `${entity} removed from favorites`;

export const buildUnprocessableFavDescription = (entity: string) =>
  `Cannot add non-existing ${entity} favorites`;

export const buildForbiddenDescription = (input: string) => `Bad ${input}`;

export const successOperationDescription = 'Successful operation';

export const missingPropertiesDescription =
  'Bad request. Missing required properties in the body';

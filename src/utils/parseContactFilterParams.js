const parseContactType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isValidType = ['work', 'home', 'personal'].includes(type);

  if (isValidType) return type;
};

const parseBoolean = (bool) => {
  const isString = typeof bool === 'string';
  if (!isString) return;

  if (bool.toLowerCase() === 'true') return true;
  if (bool.toLowerCase() === 'false') return false;
};

export const parseContactFilterParams = (query, userId) => {
  const { type, isFavourite } = query;

  const parsedType = parseContactType(type);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
    userId
  };
};

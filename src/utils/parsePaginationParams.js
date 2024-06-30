export const parseNumber = (number, defaultValue) => {
    const isString = typeof number === 'string';
    if (!isString) return defaultValue;

    const parsedNumber = parseInt(number);
    if (Number.isNaN(parsedNumber)) {
      return defaultValue;
    }

    return parsedNumber;
  };
 export const parsePaginationParams = (query) => {
  const { page = 1, perPage = 10 } = query;
  return {
    page: parseInt(page, 10),
    perPage: parseInt(perPage, 10),
  };
};

export const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});
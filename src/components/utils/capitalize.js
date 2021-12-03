const capitalize = ([first, ...rest], locale = navigator.language) =>
  first.toLocaleUpperCase(locale) + rest.join("");

export default capitalize;

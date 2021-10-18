export const checkName = (value) => {
  return value.match(/[0-9`~!@#№$%^&*()_+=|\\/{}"':;,.?<>\][]/i) === null;
};
export const checkPhoneNumberBySymbols = (value) => {
  return value.match(/[^0-9()\-+]/i) === null;
};
export const checkPhoneNumberByNumberOfDigits = (value) => {
  const v = value.match(/[0-9]/gi);
  console.log(v);
  return value.match(/[0-9]/gi) !== null
    ? value.match(/[0-9]/gi).length <= 11
    : true;
};

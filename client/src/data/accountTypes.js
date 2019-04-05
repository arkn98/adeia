export const accountTypes = Object.freeze({
  ADMIN: 'ADMIN',
  OFFICE: 'OFFICE',
  STAFF: 'STAFF',
  DEVELOPER: 'DEVELOPER'
});

export const accountTypeSelectOptions = Object.keys(accountTypes).map(
  (key, index) => {
    return {
      label:
        accountTypes[key].charAt(0) + accountTypes[key].slice(1).toLowerCase(),
      value: accountTypes[key]
    };
  }
);

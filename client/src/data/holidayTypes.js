export const holidayTypes = Object.freeze({
  PUBLIC_HOLIDAY: 'PUBLIC_HOLIDAY',
  RESTRICTED_HOLIDAY: 'RESTRICTED_HOLIDAY'
});

export const holidayTypesLabels = {
  PUBLIC_HOLIDAY: 'Public Holiday',
  RESTRICTED_HOLIDAY: 'Restricted Holiday'
};

export const holidayTypeSelectOptions = Object.keys(holidayTypes).map(
  (key, item) => {
    return {
      label: holidayTypesLabels[key],
      value: holidayTypes[key]
    };
  }
);

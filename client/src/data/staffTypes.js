export const staffTypes = Object.freeze({
  RT: 'RT',
  RNT: 'RNT',
  TF: 'TF',
  NT: 'NT',
  RS30: 'RS30',
  RS20: 'RS20',
  RSO: 'RSO',
  OTH: 'OTH'
});

const labels = {
  RT: 'Regular Teaching',
  RNT: 'Regular Non-Teaching',
  TF: 'Teaching Fellow',
  NT: 'Non-Teaching - No Leave',
  RS30: 'Research Scholars - 30',
  RS20: 'Research Scholars - 20',
  RSO: 'Research Scholars - Others',
  OTH: 'Others'
};

export const staffTypeSelectOptions = Object.keys(staffTypes).map(
  (key, index) => {
    return {
      label: `${staffTypes[key]} - ${labels[key]}`,
      value: staffTypes[key]
    };
  }
);

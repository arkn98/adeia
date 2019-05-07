export const leaveTypes = Object.freeze({
  CL: 'CL',
  CPL: 'CPL',
  EL: 'EL',
  ML: 'ML',
  OD: 'OD',
  RH: 'RH',
  SCL: 'SCL',
  CL30: 'CL30',
  CL20: 'CL20',
  CL6: 'CL6'
});

export const leaveTypesLabels = Object.freeze({
  CL: 'Casual Leave',
  CPL: 'Compensation Leave',
  EL: 'Earn Leave',
  ML: 'Medical Leave',
  OD: 'On Duty',
  RH: 'Restricted Holiday',
  SCL: 'Special Casual Leave',
  CL30: 'Casual Leave - 30 days',
  CL20: 'Casual Leave - 20 days',
  CL6: 'Casual Leave - 6 days'
});

export const leaveTypeSelectOptions = Object.keys(leaveTypes).map(
  (key, item) => {
    return {
      label: `${leaveTypes[key]} - ${leaveTypesLabels[key]}`,
      value: leaveTypes[key]
    };
  }
);

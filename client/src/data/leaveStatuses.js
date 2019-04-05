export const leaveStatuses = Object.freeze({
  WAITING: 'WAITING',
  EXPIRED: 'EXPIRED',
  ACCEPTED: 'ACCEPTED',
  REJECTEDBYHOD: 'REJECTEDBYHOD',
  AUTOREJECTED: 'AUTOREJECTED',
  REJECTEDBYALT: 'REJECTEDBYALT'
});

export const leaveStatusSelectOptions = Object.keys(leaveStatuses).map(
  (key, index) => {
    return {
      value: leaveStatuses[key],
      label:
        leaveStatuses[key].charAt(0) + leaveStatuses[key].slice(1).toLowerCase()
    };
  }
);

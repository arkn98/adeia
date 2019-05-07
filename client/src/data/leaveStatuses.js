export const leaveStatuses = Object.freeze({
  WAITING: 'WAITING',
  REJECTEDBYALT: 'REJECTEDBYALT',
  WAITINGHODAPPROVAL: 'WAITINGHODAPPROVAL',
  REJECTEDBYHOD: 'REJECTEDBYHOD',
  ACCEPTED: 'ACCEPTED',
  EXPIRED: 'EXPIRED',
  CANCELLEDWAITINGHODAPPROVAL: 'CANCELLEDWAITINGHODAPPROVAL',
  CANCELLED: 'CANCELLED'
});

export const leaveStatusLabels = Object.freeze({
  WAITING: "Waiting for alternating staff's approval",
  REJECTEDBYALT: 'Rejected by alternating ataff',
  WAITINGHODAPPROVAL: "Waiting for HOD's approval",
  REJECTEDBYHOD: 'Rejected by HOD',
  ACCEPTED: 'Accepted',
  EXPIRED: 'Expired',
  CANCELLEDWAITINGHODAPPROVAL: "Cancellation request - waiting HOD's approval",
  CANCELLED: 'Cancelled'
});

export const leaveStatusSelectOptions = Object.keys(leaveStatuses).map(
  (key, index) => ({
    value: leaveStatuses[key],
    label: leaveStatusLabels[key]
  })
);

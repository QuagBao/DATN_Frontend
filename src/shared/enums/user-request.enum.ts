export enum EUserRequestType {
  paidLeave = 1,
  publicHolidayLeave,
  companyHolidayLeave,
  insuredPaidLeave,
  unpaidLeave,
  remoteWork,
  overtime,
  editTimeSheet
}

export enum EUserRequestStatus {
  pending = 1,
  approved,
  rejected
}

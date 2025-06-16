export enum ELogStatus {
  success = 1,
  failure,
  pending
}

export enum ELogAction {
  register = 1,
  login,
  logout,
  logoutAll,
  changePriPassword,
  createSecPassword,
  changeSecPassword,
  changeEmail,
  changeUserName,
  verifyEmail,
  resendVerifyEmail,
  forgotPassword,
  resetPassword
}

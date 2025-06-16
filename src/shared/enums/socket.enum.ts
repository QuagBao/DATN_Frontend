export enum SocketNamespace {
  USERS = 'users',
  STAFFS = 'staffs',
  ROLES = 'roles',
  NOTIFICATIONS = 'not',
  STOCKS = 'stocks',
  MANAGEMENT = 'mgm',
  ORDERS = 'orders'
}

export enum SocketEvent {
  USER_INFO_UPDATED = 'user-info-upd',
  CREATE_USERS = 'create-users',
  REMOVE_USERS = 'rm-users',
  BAN_USERS = 'ban-users',
  UNBAN_USERS = 'unban-users',

  CREATE_STAFFS = 'create-staffs',
  UPDATE_STAFFS = 'upd-staffs',
  REMOVE_STAFFS = 'rm-staffs',
  BAN_STAFFS = 'ban-staffs',
  REMOVE_ROLE_STAFFS = 'rm-role-staffs',
  UNBAN_STAFFS = 'unban-staffs',

  ROLE_UPDATED = 'role-upd',
  ROLE_CREATED = 'role-crd',
  ROLE_DELETED = 'role-dld',
  ASSIGN_PERMISSION = 'assign-perm',
  ASSIGN_ACCOUNTS = 'assign-accts',

  REQUEST_DEPOSIT_WITHDRAWAL = 'req-dep-wd',
  UPDATE_DEPOSIT_WITHDRAWAL = 'upd-dep-wd',
  REJECT_DEPOSIT_WITHDRAWAL = 'rej-dep-wd',
  SUCCESS_DEPOSIT_WITHDRAWAL = 'suc-dep-wd',
  PROCESSING_DEPOSIT_WITHDRAWAL = 'proc-dep-wd',

  SUBSCRIBE_STOCK = 'sub-stock',
  UNSUBSCRIBE_STOCK = 'uns-stock',
  CHANGE_INTERVAL = 'chg-interval',
  MARKET_TREND_UPDATE = 'mkt-trend-upd',
  KLINE_UPDATE = 'kline-upd',

  REQUEST_ORDER = 'req-order',
  PROCESSING_ORDER = 'proc-order',
  REJECT_ORDER = 'rej-order',
  SUCCESS_ORDER = 'suc-order',

  UPDATE_BALANCE = 'upd-bal',
  ERROR = 'error',
  DISCONNECT = 'disc',
  CONNECT = 'conn'
}

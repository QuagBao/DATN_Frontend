import { type EBroadcastAuthAction } from '~/shared/enums/broadcast.enum'

export interface TAuthBroadcastEvent {
  action: EBroadcastAuthAction
  tabId?: string
}

export const emitAuthBroadcast = (action: TAuthBroadcastEvent['action']) => {
  if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
    const tabId = sessionStorage.getItem('tabId')
    const bc = new BroadcastChannel('auth')
    bc.postMessage({ action, tabId })
    setTimeout(() => {
      bc.close()
    }, 1000)
  }
}

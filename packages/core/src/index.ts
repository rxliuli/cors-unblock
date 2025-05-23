import { internalMessaging } from './internal'

export function getAllowedInfo() {
  return internalMessaging.sendMessage('getAllowedInfo', undefined)
}

export function requestHosts(data: { hosts: string[] }) {
  return internalMessaging.sendMessage('requestHosts', data)
}

export function hasInstall() {
  return document.documentElement.dataset.corsUnblock
}

export function install() {
  location.href =
    'https://chromewebstore.google.com/detail/odkadbffomicljkjfepnggiibcjmkogc'
}

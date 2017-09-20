import { AsyncStorage } from 'react-native'

export function fetchCalendarResults () {
  return AsyncStorage.getItem()
    .then()
}

export function submitEntry () {
  return AsyncStorage.mergeItem()
}

export function removeEntry () {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    .then()
}

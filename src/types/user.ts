import firebase from "../config"

export interface User extends UserStats {
  uid?: string
  age?: number
  displayName?: string
  photoURL?: string
  email?: string
  emailVerified?: boolean
  gender?: "male" | "female"
  lastTestAt?: firebase.firestore.Timestamp
  onBoarding?: boolean
  feedback?: boolean
  isAnonymous?: boolean
  colorMode?: "light" | "dark"
  settings?: UserSettings
  messagingToken?: string
  history?: UserStats[]
  providers?: string[]
  orders?: Order[]
  complete?: boolean
}

export interface UserStats {
  tests?: number
  accuracy?: number
  score?: number
  level?: number
  statDate?: Date
}
export interface Order {
  orderId?: string
  amount: number
  date?: Date
}

export interface UserSettings {}

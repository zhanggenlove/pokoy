import { DocumentData, DocumentReference, Timestamp } from "firebase/firestore"

export interface Coords {
  x: number
  y: number
}

export interface StatsData {
  [date: string]: number[]
}

export interface PokoySession {
  duration: number
  timestamp: string
  user?: string | DocumentReference<DocumentData>
  userId: string
}

export interface UserStats {
  totalDuration: number
  count: number
  userId: string
}

export interface DayData {
  timestamp: Timestamp
  totalDuration: number
  count: number
  meditations: PokoySession[]
  userId: string
  statsRef?: DocumentReference<DocumentData>
}

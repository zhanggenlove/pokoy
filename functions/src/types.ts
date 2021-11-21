import { DocumentData, DocumentReference, Timestamp } from "firebase/firestore";

// FIXME: duplicated types from pokoy-frontend sources

export interface PokoySession {
  duration: number;
  timestamp: string;
  user?: string | DocumentReference<DocumentData>;
  userId: string;
}

export interface UserStats {
  totalDuration: number;
  count: number;
  userId: string;
}

export interface DayData {
  timestamp: Timestamp;
  totalDuration: number;
  count: number;
  meditations: PokoySession[];
  userId: string;
  statsRef: DocumentReference<DocumentData>
}

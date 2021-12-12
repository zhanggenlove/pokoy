// FIXME: duplicated types from pokoy-frontend sources

export interface PokoySession {
  duration: number;
  timestamp: string;
  user?:
    | string
    | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
  userId: string;
}

export interface UserStatsData {
  totalDuration: number;
  count: number;
  userId: string;
}

export interface DayData {
  timestamp: FirebaseFirestore.Timestamp;
  totalDuration: number;
  count: number;
  meditations: PokoySession[];
  userId: string;
  statsRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
}

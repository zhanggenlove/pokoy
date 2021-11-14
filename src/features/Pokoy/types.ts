import { DocumentReference } from "firebase/firestore";

export type Timestamp = string;

export interface PokoySession {
  duration: number;
  timestamp: Timestamp;
  user: DocumentReference<UserData>;
}

export interface UserData {
  name: string;
  email: string;
  statistics: UserStats;
}

export interface UserStats {
  totalDuration: number;
  count: number;
  lastFive: PokoySession[];
}

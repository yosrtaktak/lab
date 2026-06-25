import { Evenement } from "./evenement";

export interface Member {
  id: string;
  cin: string;
  nom: string;
  type: string;
  createdDate: string;
  tab_events?: Evenement[];
}
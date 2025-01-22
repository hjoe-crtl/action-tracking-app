import { Structure } from './structure.model';
import { TypeAction } from './type-action.model';
import { Utilisateur } from './utilisateur.model';

export interface Action {
  id?: number;
  titre: string;
  description: string;
  nbLivrablesAttendus: number;
  nbLivrablesRealises: number;
  tauxRealisation: number;
  dateCreation: Date;
  typeAction: TypeAction;
  structure: Structure;
  creePar: Utilisateur;
}

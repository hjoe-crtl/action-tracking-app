export enum NiveauStructure {
  CENTRAL = 'CENTRAL',
  REGIONAL = 'REGIONAL',
  DEPARTEMENTAL = 'DEPARTEMENTAL',
  LOCAL = 'LOCAL'
}

export interface Structure {
  id?: number;
  nom: string;
  niveau: NiveauStructure;
  structureParent?: Structure;
  structuresEnfants?: Structure[];
}

export interface Formateur {
  mail: string;
  nom: string;
  prenom: string;
}

export interface RawModule {
  id: string;
  name: string;
  start: string;
  end: string;
  theme: string;
  filiere: string;
  formateur: Formateur;
}
export interface Module {
  id: string;
  name: string;
  start: Date;
  end: Date;
  theme: string;
  filiere: string;
  formateur: Formateur;
}

export type Style = {
  className: string;
  props?: any;
};

export interface Interval {
  start: Date;
  end: Date;
}

export interface Filiere {
  start: Date;
  end: Date;
  formateur: Formateur;
  nom: string;
}

export interface StyleProps {
  className?: string;
  style?: any;
}

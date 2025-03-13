export interface User {
  id? : string,
  email : string,
  password : string,
  genre : string,
  nom : string,
  dateNaissance : string,
  telephone : string,
  roleLibelles?: string[],
  etat: string
}

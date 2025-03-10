export interface User {
  id? : number,
  email : string,
  password : string,
  genre : string,
  nom : string,
  dateNaissance : string,
  telephone : string,
  roleLibelles?: string[]
}

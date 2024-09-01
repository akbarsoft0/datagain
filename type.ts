export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}
export interface Event {
  id: number;
  title: string;
  description: string;
  date: number | string;
  reminder:boolean
}

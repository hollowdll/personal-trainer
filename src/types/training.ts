import { Customer } from "./customer";

export interface Training {
  id: number,
  date: string,
  duration: number,  // Duration in minutes
  activity: string,
  customer: Customer,
}
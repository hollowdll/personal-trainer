import { Customer } from "./customer";

export interface Training {
  id: string,
  date: string,
  duration: string,  // Duration in minutes
  activity: string,
  customer: Customer,
}
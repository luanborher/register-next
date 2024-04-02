export interface IUserReports {
  user: string;
  user_id: string;
  registers: number;
  ausente: number;
  vago: number;
  total: number;
  registerPercentage: number;
  ausentePercentage: number;
  vagoPercentage: number;
  daysWorked: number;
  registersPerDay: number;
}

export interface IUserDetails {
  user_id: string;
  user: string;
  registersByDay: RegistersByDay[];
}

export interface RegistersByDay {
  date: string;
  NORMAL?: number;
  AUSENTE?: number;
  VAGO?: number;
}

// reports contracts

export interface IContracts {
  community_id: string;
  community_name: string;
  registers: number;
  vagos: number;
  ausentes: number;
  total: number;
}

export interface Paginated<T> {
  data: T;
  page: number;
  limit: number;
  totalCount: number;
}

export interface Records {
  id: string;
  name: string;
  cpf: string;
  rg: string;
  phone: string;
  telephone: string;
  gender: string;
  birthDate: string;
  entity_type: string;
  marital_status: string;
  number_people_living: number;
  number_people_working: number;
  family_income: number;
  social_benefit: string;
  profession: string;
  unemployed: boolean;
  attendant_name: string;
  attendant_cpf: string;
  attendant_rg: string;
  attendant_telephone: string;
  user_id: string;
  user: User;
  attendant_entity: string;
  status: string;
  property: Property;
  social_information: SocialInformation;
  created_at: string;
  updated_at: string;
}

export interface Property {
  id: string;
  registration: string;
  provider_registration: string;
  codification: string;
  street_code: string;
  property_situation: string;
  structure_type: string;
  area: number;
  number: string;
  zip_code: string;
  complement: string;
  reference: string;
  between_numbers: string;
  quantity_rooms: number;
  bed: string;
  tour: string;
  status: string;
  connection_type: string;
  hydrometer_number: string;
  old_hydro: string;
  reservoir: boolean;
  exhaustion: boolean;
  property_type: string;
  quantity_amount: number;
  facade_url: string;
  first_document_url: string;
  second_document_url: string;
  additional_url: string;
  signature_url: string;
  client_id: string;
  street_id: string;
  created_at: string;
  updated_at: string;
  street: Street;
}

export interface Street {
  id: string;
  name: string;
  cep: string;
  community_id: string;
  created_at: string;
  updated_at: string;
  community: Community;
}

export interface Community {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  contract_id: string;
  contract: Contract;
}

export interface Contract {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface SocialInformation {
  id: string;
  quantity_working: number;
  provider: string;
  income: number;
  benefit: string;
  profission: string;
  race: string;
  scholarity: string;
  reservoir: string;
  quantity_children: number;
  quantity_teenagers: number;
  quantity_preteens: number;
  quantity_young: number;
  quantity_adults: number;
  have_history_of_illness: boolean;
  client_id: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  login: string;
  password: string;
  registration: string;
  cpf: string;
  company: string;
  phone: string;
  device_token: null;
  active: boolean;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface RecordsFilter {
  name: string;
}
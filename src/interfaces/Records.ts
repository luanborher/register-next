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

  user_id: string;
  user: User;

  entity_type: string;
  marital_status: string;
  number_people_living: number;
  number_people_working: number;
  social_benefit: string;
  profession: string;
  unemployed: boolean;
  status: string;
  property: Property;
  social_information: SocialInformation;
  created_at: string;
  updated_at: string;
  situation_status: string;

  what_awaits_your_family: string;

  attendant_name: string;
  attendant_cpf: string;
  attendant_rg: string;
  attendant_telephone: string;
  attendant_entity: string;
}

export interface Property {
  id: string;
  codification: string;
  street_code: string;
  area: number;
  hydrometer_number: string;
  old_hydro: string;
  registration: string;
  street: Street;
  street_id: string;
  number: string;
  zip_code: string;
  complement: string;
  reference: string;
  between_numbers: string;
  quantity_rooms: number;
  provider_registration: string;
  connection_type: string;
  property_situation: string;
  property_type: string;
  structure_type: string;
  bed: string;
  tour: string;

  status: string;
  reservoir: boolean;
  exhaustion: boolean;
  quantity_amount: number;

  facade_url: string;
  first_document_url: string;
  second_document_url: string;
  additional_url: string;
  signature_url: string;

  client_id: string;
  created_at: string;
  updated_at: string;
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
  scholarity: string;
  profission: string;
  benefit: string;
  income: number;
  provider: string;

  have_history_of_illness: string[];
  quantity_adults: number;
  quantity_children: number;
  quantity_teenagers: number;
  quantity_preteens: number;
  quantity_elder: number;
  quantity_working: number;

  race: string;
  reservoir: string;

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
  street_id: string;
  community_id: string;
  contract_id: string;
  situation: string;
}

export interface Filtered {
  contracts: Contract[];
  communities: Community[];
  streets: Street[];
}

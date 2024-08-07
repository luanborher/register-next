export interface ResponseInativas {
  id: string;
  pde: string;
  community: string;
  type: string;
  street: string;
  number: string;
  complement: string;
  cep: string;
  neighborhood: string;
  name: string;
  situation: string;
  property_type: string;
  economy_count: string;
  hidrometer: string;
  bill_quantity: string;
  total_value: string;
  total_value_corrected: string;
  proposal: string;
  fornecimento: string;
  consulted_status: string;
  atc: string;
  group: string;
  sector: string;
  route: string;
  block: string;
  local: string;
  sublocal: string;
  village: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Inativas extends ResponseInativas {
  InativasSent: InativasSent[];
}

export interface InativasSent {
  id: string;
  inativa_id: string;
  user_id: string;
  status: string;
  date: string;
  name: string;
  rg: string;
  cpf: string;
  birthDate: string;
  phone1: string;
  phone2: string;
  address: string;
  number: string;
  complement: string;
  hasWaterBox: string;
  owner: string;
  headedFamily: string;
  qntEconomies: string;
  occupancyTime: string;
  qntWorkers: string;
  income: string;
  qntAdults: string;
  qntChildren: string;
  betweenNumbers: string;
  reference: string;
  reading: string;
  hydrometer: string;
  facadePic: string;
  documentPic1: string;
  documentPic2: string;
  hydroPicOld: string;
  hydroPicNew: string;
  serviceDonePic: string;
  signature: string;
  type: string;
  created_at: string;
  updated_at: string;
}

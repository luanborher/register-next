export interface IInativas {
  sector: string;
  count: number;
  routes: Route[];
}

export interface Route {
  sector: string;
  route: string;
  count: number;
  blocks: Block[];
}

export interface Block {
  sector: string;
  route: string;
  block: string;
  count: number;
}

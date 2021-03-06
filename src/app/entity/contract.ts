import {Type} from "./type";
import {Instance} from "./instance";

export class Contract {
  constructor(id: number,
              name: string,
              code: string,
              abi: string,
              active: boolean,
              type: Type,
              instances: Instance[]) {

  }
}

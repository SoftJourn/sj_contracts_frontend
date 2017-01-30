import {Variable} from "./variable";
export class ContractUnit {

  private _name?: string;
  private _constant?: boolean;
  private _type?: string;
  private _anonymous?: boolean;
  private _inputs?: Variable[];
  private _outputs?: Variable[];

  constructor() {
  }

  static getPropertiesNameByType(type: string): string[] {
    if (type == "event") return ["name", "type", "anonymous", "inputs"];
    if (type == "function") return ["name", "constant", "type", "inputs", "outputs"];
    if (type == "constructor") return ["type", "inputs"];
  }


  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get constant(): boolean {
    return this._constant;
  }

  set constant(value: boolean) {
    this._constant = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get anonymous(): boolean {
    return this._anonymous;
  }

  set anonymous(value: boolean) {
    this._anonymous = value;
  }

  get inputs(): Variable[] {
    return this._inputs;
  }

  set inputs(value: Variable[]) {
    this._inputs = value;
  }

  get outputs(): Variable[] {
    return this._outputs;
  }

  set outputs(value: Variable[]) {
    this._outputs = value;
  }
}

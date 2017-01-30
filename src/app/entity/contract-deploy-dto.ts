export class ContractDeployDto {
  name: string;
  code: string;
  abi: string;
  type: string;
  parameters: any[];

  constructor(name: string, code: string, abi: string, type: string, parameters: any[]) {
    this.name = name;
    this.code = code;
    this.abi = abi;
    this.type = type;
    this.parameters = parameters;
  }
}

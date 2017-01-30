export class InstanceDeployDto {

  contractId: number;
  name: string;
  parameters: any[];

  constructor(contractId: number, name: string, parameters: any[]) {
    this.contractId = contractId;
    this.name = name;
    this.parameters = parameters;
  }

}

import {Injectable} from "@angular/core";
import {AppProperties} from "../shared/app.properties";
import {Observable} from "rxjs";
import {Type} from "../entity/type";
import {HttpService} from "./http.service";
import {Contract} from "../entity/contract";
import {ContractDeployDto} from "../entity/contract-deploy-dto";
import {InstanceDeployDto} from "../entity/instance-deploy-dto";

@Injectable()
export class ContractService {

  protected getUrl(): string {
    return `${AppProperties.API_COINS_ENDPOINT}/contracts`;
  }

  constructor(private httpService: HttpService) {
  }

  public getContracts(): Observable<Contract[]> {
    return this.httpService.get(this.getUrl()).map(response => response.json());
  }

  public getContract(id: number): Observable<Contract> {
    return this.httpService.get(this.getUrl() + '/' + id).map(response => response.json());
  }

  public getTypes(): Observable<Type[]> {
    return this.httpService.get(this.getUrl() + '/types').map(response => response.json());
  }

  public getContractsByType(type: string): Observable<Contract[]> {
    return this.httpService.get(this.getUrl() + '/types/' + type).map(response => response.json());
  }

  public deployContract(contract: ContractDeployDto): Observable<any> {
    return this.httpService.post(this.getUrl(), contract).map(response => response.json());
  }

  public changeActive(id: number): Observable<any> {
    return this.httpService.post(this.getUrl() + '/' + id, '').map(response => response.json());
  }

  public deployContractInstance(instance: InstanceDeployDto): Observable<any> {
    return this.httpService.post(this.getUrl() + '/instances', instance).map(response => response.json());
  }

}

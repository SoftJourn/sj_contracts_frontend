import {
  Component,
  OnInit
} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ContractService} from "../../services/contract.service";
import {Contract} from "../../entity/contract";
import {ContractUnit} from "../../entity/contract-unit";
import {ContractUnitService} from "../../services/contract-unit.service";

@Component({
  selector: 'app-contract',
  templateUrl: 'contract.component.html',
  styleUrls: ['contract.component.scss']
})
export class ContractComponent implements OnInit {

  public isCollapsed1 = true;
  public isCollapsed2 = false;

  contract: Contract;
  units: ContractUnit[];
  private contractId: number;
  unitToShow: ContractUnit;

  showAnonymous: boolean;
  showConstant: boolean;

  constructor(private route: ActivatedRoute,
              private contractService: ContractService,
              private contractUnitService: ContractUnitService) {
  }

  ngOnInit() {
    this.contractId = parseInt(this.route.snapshot.params['id']);
    this.contractService.getContract(this.contractId).subscribe(contract => {
      this.contract = contract;
      this.units = this.contractUnitService.getContractUnit(this.contract['abi']);
      this.units.sort(function (a: ContractUnit, b: ContractUnit) {
        let typeA = a.type.toUpperCase();
        let typeB = b.type.toUpperCase();
        if (typeA > typeB) return 1; else return -1;
      });
      for (let unit of this.units) {
        if (unit.type == 'constructor') {
          unit.name = 'Constructor';
        }
      }
      this.unitToShow = this.units[0];
    });
  }

  openDescription(index): void {
    this.unitToShow = this.units[index];
    typeof this.unitToShow.anonymous != 'undefined' ? this.showAnonymous = true : this.showAnonymous = false;
    typeof this.unitToShow.constant != 'undefined' ? this.showConstant = true : this.showConstant = false;
  }

}

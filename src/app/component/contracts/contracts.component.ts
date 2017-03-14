import {
  Component,
  OnInit,
  HostListener
} from '@angular/core';
import {ContractService} from "../../services/contract.service";
import {Type} from "../../entity/type";
import {Contract} from "../../entity/contract";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contracts',
  templateUrl: 'contracts.component.html',
  styleUrls: ['contracts.component.scss']
})
export class ContractsComponent implements OnInit {

  types: Type[];
  contracts: Contract[];

  constructor(private contractService: ContractService,
              private router: Router) {
  }

  ngOnInit() {
    this.contractService.getTypes().subscribe(types => {
      this.types = types;
    });
    this.contractService.getContracts().subscribe(
      contracts => {
        this.contracts = contracts;
      }
    );
  }

  typeChange(event): void {
    if (event == 'All') {
      this.contractService.getContracts().subscribe(
        contracts => {
          this.contracts = contracts;
        }
      );
    } else {
      this.contractService.getContractsByType(event).subscribe(
        contracts => {
          this.contracts = contracts;
        }
      );
    }
  }

  openContract(event: Event, index) {
    if (!event.defaultPrevented) {
      this.router.navigate(['/contracts/' + index]);
    }
  }

  changeActivation(event: Event, contractId): void {
    event.preventDefault();
    this.contractService.changeActive(contractId).subscribe(response => {
      this.contractService.getContracts().subscribe(
        contracts => {
          this.contracts = contracts;
        }
      );
    });
  }

}

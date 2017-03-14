import {
  Component,
  OnInit
} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ContractService} from "../../services/contract.service";
import {ContractUnitService} from "../../services/contract-unit.service";
import {Contract} from "../../entity/contract";
import {ContractUnit} from "../../entity/contract-unit";
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray
} from "@angular/forms";
import {FormValidationStyles} from "../../shared/form-validation-styles";
import {Variable} from "../../entity/variable";
import {InstanceDeployDto} from "../../entity/instance-deploy-dto";
import {ErrorDetail} from "../../entity/error-detail";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'app-instance',
  templateUrl: 'instance.component.html',
  styleUrls: ['instance.component.css']
})
export class InstanceComponent implements OnInit {

  contract: Contract;
  units: ContractUnit[];
  private contractId: number;

  deployForm: FormGroup;
  formStyles: FormValidationStyles;

  constructor(private route: ActivatedRoute,
              private contractService: ContractService,
              private contractUnitService: ContractUnitService,
              private notificationService: NotificationsService) {
  }

  ngOnInit() {
    this.buildDeployForm();
    this.contractId = parseInt(this.route.snapshot.params['id']);
    this.contractService.getContract(this.contractId).subscribe(contract => {
      this.contract = contract;
      this.units = this.contractUnitService.getContractUnit(this.contract['abi']);

      let unit = this.units.filter((unit: any) => unit.type == 'constructor');
      if (unit.length == 1) {
        let parameters = <FormArray>this.deployForm.get('parameters');
        let constructor = <ContractUnit>unit[0];
        for (let variable of <Variable[]>constructor.inputs)
          parameters.push(this.contractUnitService.formGroupDependsOnType(variable));
      }
    });
  }

  buildDeployForm(): void {
    this.deployForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      parameters: new FormArray([])
    });

    this.formStyles = new FormValidationStyles(this.deployForm);
  }

  onSubmit() {
    this.contractService.deployContractInstance(new InstanceDeployDto(this.contractId,
      this.deployForm.get('name').value, this.contractUnitService.collectParameters(this.deployForm.value['parameters'])))
      .subscribe(response => {
        this.notificationService.success('Success', 'Contract has been deployed successfully!');
      }, error => {
        try {
          let errorDetail = <ErrorDetail> error.json();
          if (!errorDetail.detail)
          //noinspection ExceptionCaughtLocallyJS
            throw errorDetail;
          this.notificationService.error('Error', errorDetail.detail);
        } catch (err) {
          console.log(err);
          this.notificationService.error('Error', 'Error appeared, watch logs!');
        }
      });
  }


}

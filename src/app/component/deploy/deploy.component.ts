import {
  Component,
  OnInit
} from "@angular/core";
import {ContractService} from "../../services/contract.service";
import {Type} from "../../entity/type";
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray
} from "@angular/forms";
import {FormValidationStyles} from "../../shared/form-validation-styles";
import {ContractUnit} from "../../entity/contract-unit";
import {Variable} from "../../entity/variable";
import {ContractUnitService} from "../../services/contract-unit.service";
import {ContractDeployDto} from "../../entity/contract-deploy-dto";
import {ErrorDetail} from "../../entity/error-detail";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'app-deploy',
  templateUrl: 'deploy.component.html',
  styleUrls: ['deploy.component.css']
})
export class DeployComponent implements OnInit {

  types: Type[];
  deployForm: FormGroup;
  formStyles: FormValidationStyles;

  constructor(private contractService: ContractService,
              private contractUnitService: ContractUnitService,
              private notificationService: NotificationsService) {
  }

  ngOnInit() {
    this.buildDeployForm();
    this.contractService.getTypes().subscribe(types => {
      this.types = types;
      this.deployForm.get('type').patchValue(types[0]);
    });
  }

  buildDeployForm(): void {
    this.deployForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', Validators.required),
      code: new FormControl('', [Validators.required, Validators.pattern('^[a-fA-F0-9]+$')]),
      abi: new FormControl('', [Validators.required, this.contractUnitService.allFieldsMatcher()]),
      parameters: new FormArray([])
    });

    this.deployForm.get('abi').valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(change => {
        this.cleanParameters();
        if (this.deployForm.get('abi').valid) {
          let units = this.contractUnitService.getContractUnit(change);
          let unit = units.filter((unit: any) => unit.type == 'constructor');
          if (unit.length == 1) {
            let parameters = <FormArray>this.deployForm.get('parameters');
            let constructor = <ContractUnit>unit[0];
            for (let variable of <Variable[]>constructor.inputs)
              parameters.push(this.contractUnitService.formGroupDependsOnType(variable));
          }
        } else {
          this.cleanParameters();
        }
      });

    this.formStyles = new FormValidationStyles(this.deployForm);
  }

  onSubmit() {
    this.contractService.deployContract(new ContractDeployDto(this.deployForm.get('name').value,
      this.deployForm.get('code').value, this.deployForm.get('abi').value, this.deployForm.get('type').value.type,
      this.contractUnitService.collectParameters(this.deployForm.value['parameters'])))
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

  private cleanParameters(): void {
    let parameters = <FormArray>this.deployForm.get('parameters');
    let length = parameters.controls.length;
    for (let i = 0; i < length; i++) {
      parameters.removeAt(0);
    }
  }

  public handleInputChange(e, destination: string) {
    let file: File = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      // prepare buffer
      let bufView = new Uint16Array(reader.result);
      // read by char code
      for (let i = 0, strLen = reader.result.length; i < strLen; i++) {
        bufView[i] = reader.result.charCodeAt(i);
      }
      // char codes to string
      let result = Array.prototype.map.call(bufView, function (ch) {
        return String.fromCharCode(ch);
      }).join('');
      this.deployForm.get(destination).patchValue(result);
      this.deployForm.get(destination).markAsDirty();
      e.target.value = null;
      this.notificationService.success('Success', 'File was loaded successfully!');
      // };
      reader.onerror = () => {
        this.notificationService.error('Error', 'File was not loaded, file may contain mistakes!')
      };
    };
    // read file using byte array method
    reader.readAsArrayBuffer(file);
  }


}

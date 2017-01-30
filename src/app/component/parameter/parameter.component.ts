import {
  Component,
  OnInit,
  Input
} from "@angular/core";
import {
  FormGroup,
  FormArray
} from "@angular/forms";
import {FormValidationStyles} from "../../shared/form-validation-styles";
import {ContractUnitService} from "../../services/contract-unit.service";
import {Variable} from "../../entity/variable";

@Component({
  selector: 'app-parameter',
  templateUrl: 'parameter.component.html',
  styleUrls: ['parameter.component.scss']
})
export class ParameterComponent implements OnInit {

  bool: boolean = false;
  number: boolean = false;
  address: boolean = false;
  array: boolean = false;

  @Input('form')
  form: FormGroup;

  @Input('index')
  index: number;

  @Input('showName')
  showName: boolean;

  @Input('showType')
  showType: boolean;

  formStyles: FormValidationStyles;

  constructor(private contractUnitService: ContractUnitService) {
  }

  ngOnInit() {
    if (this.form.get('type').value == 'bool') {
      this.bool = true
    } else if (this.form.get('type').value.includes('uint')) {
      this.number = true
    } else if (this.form.get('type').value == 'address') {
      this.address = true;
    } else if (this.form.get('type').value.includes('[]')) {
      this.array = true;
    }

    this.formStyles = new FormValidationStyles(this.form);
  }

  onAdd() {
    let controls = <FormArray>this.form.controls['value'];
    controls.push(this.contractUnitService.formGroupDependsOnType(new Variable('', controls.at(0).get('type').value)));
  }

  onRemove(){
    let controls = <FormArray>this.form.controls['value'].parent.parent;
    controls.removeAt(this.index);
  }

}

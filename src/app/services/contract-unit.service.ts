import {Injectable} from "@angular/core";
import {ContractUnit} from "../entity/contract-unit";
import {
  ValidatorFn,
  AbstractControl,
  FormGroup,
  FormControl,
  Validators,
  FormArray
} from "@angular/forms";
import {Variable} from "../entity/variable";

@Injectable()
export class ContractUnitService {

  constructor() {
  }

  isJson(value: string): any {
    try {
      return JSON.parse(value);
    } catch (error) {
      throw new Error('Entered string is not a json!');
    }
  }

  isJsonArray(value: string): any {
    let array = this.isJson(value);
    if (Array.isArray(array)) {
      return array;
    } else {
      throw new Error('Entered string is not a json array!');
    }
  }

  isJsonArrayEmpty(values: Array<any>) {
    if (values.length == 0) {
      throw new Error('Entered json array is empty!');
    }
  }

  isContractUnit(value: any): ContractUnit {
    let unit = new ContractUnit();
    if (value.hasOwnProperty('type')) {
      for (let property of ContractUnit.getPropertiesNameByType(value['type'])) {
        if (value.hasOwnProperty(property)) {
          unit[property] = value[property];
        } else {
          throw new Error('Entered objects is not contracts units!');
        }
      }
    } else {
      throw new Error('Entered objects is not contracts units!');
    }
    return unit;
  }

  getContractUnit(values: any): ContractUnit[] {
    let units = new Array<ContractUnit>();
    let arrays = this.isJsonArray(values);
    this.isJsonArrayEmpty(arrays);
    for (let value of arrays) {
      units.push(this.isContractUnit(value));
    }
    return units;
  }

  allFieldsMatcher(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      try {
        console.log(control.value);
        this.getContractUnit(control.value);
      } catch (error) {
        return {'error': error.message};
      }
    }
  }

  formGroupDependsOnType(variable: Variable): FormGroup {
    let controls = {
      name: new FormControl(variable.name),
      type: new FormControl(variable.type)
    };
    if (variable.type == 'bool') {
      controls['value'] = new FormControl('', [Validators.required]);
    } else if (variable.type.includes('uint')) {
      controls['value'] = new FormControl('', [Validators.required, Validators.pattern('^[0-9]\\d*$')]);
    } else if (variable.type == 'address') {
      controls['value'] = new FormControl('', [Validators.required, Validators.minLength(40), Validators.maxLength(40)]);
    } else if (variable.type.includes('[]')) {
      controls['value'] = new FormArray([this.formGroupDependsOnType(new Variable('',
        variable.type.substring(0, variable.type.length - 2)))]);
    }
    return new FormGroup(controls);
  }

  collectParameters(values: any[]): any[] {
    let parameters = new Array();
    for (let value of values) {
      if (value.type.includes('[]')) {
        parameters.push(this.collectParameters(value['value']));
      } else {
        parameters.push(value['value'])
      }
    }
    return parameters;
  }

}

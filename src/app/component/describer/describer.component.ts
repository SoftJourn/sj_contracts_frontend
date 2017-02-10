import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {ContractUnit} from "../../entity/contract-unit";

@Component({
  selector: 'app-describer',
  templateUrl: 'describer.component.html',
  styleUrls: ['describer.component.css']
})
export class DescriberComponent implements OnInit {

  @Input('unit')
  unit: ContractUnit;

  @Input('showAnonymous')
  showAnonymous: boolean;

  @Input('showConstant')
  showConstant: boolean;


  constructor() {
  }

  ngOnInit() {
  }

}

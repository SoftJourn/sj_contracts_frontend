import {
  Component,
  OnInit,
} from "@angular/core";
import {FormValidationStyles} from "../../shared/form-validation-styles";
import {
  FormGroup,
  FormControl,
  FormArray
} from "@angular/forms";
import {CompileObject} from "../../entity/compile-object";
import {CompileRequest} from "../../entity/compile-request";
import {CompileService} from "../../services/compile.service";
import {CompileResponse} from "../../entity/compile-response";
import {CompiledObject} from "../../entity/compiled-object";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'app-compile',
  templateUrl: './compile.component.html',
  styleUrls: ['./compile.component.scss']
})
export class CompileComponent implements OnInit {

  code: string;

  compileForm: FormGroup;
  compilationResultsForm: FormGroup;
  formStyles: FormValidationStyles;

  constructor(private compileService: CompileService,
              private notificationService: NotificationsService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  ngAfterViewInit() {
    let editor = ace.edit("code");
    editor.setTheme("ace/theme/ambiance");
    editor.$blockScrolling = Infinity;
    editor.getSession().setMode("ace/mode/solidity");
    editor.getSession().on('change', e => {
      this.code = editor.getValue();
    });
    editor.setOptions({
      showGutter: true,
      showInvisibles: false,
      highlightActiveLine: true,
      highlightGutterLine: true,
      fontSize: 15
    });
  }

  buildForm(): void {
    this.compileForm = new FormGroup({
      optimize: new FormControl(false)
    });
    this.formStyles = new FormValidationStyles(this.compileForm);
  }

  onCompile() {
    try {
      let optimize = this.compileForm.get('optimize').value;
      let objectNames = this.getObjectNames(this.code);
      let compileObject = new CompileObject(objectNames, this.prepareCode(this.code));
      let compileRequestObject = new CompileRequest("", "sol", {"object.sol": compileObject}, "", optimize, {"object.sol": "object.sol"});
      this.compileService.compile(compileRequestObject).subscribe((response: CompileResponse) => {
        this.prepareResultForm(response);
      }, error => {
        this.notificationService.error('Error', 'Something went wrong watch logs!');
      });
    } catch (error) {
      this.notificationService.error('Error', error.message);
    }
  }

  // converts string code into bytes array and then into base64
  private prepareCode(code: string): string {
    // code to byte array
    let bufView = this.stringToByteArray(code);
    // byte array to string
    let binstr = Array.prototype.map.call(bufView, function (ch) {
      return String.fromCharCode(ch);
    }).join('');
    return btoa(binstr);
  }

  // gets contracts names from code
  private getObjectNames(code: string) {
    let names = new Array<string>();
    let pattern = /(?:contract)\s(\w+)/g;
    let matches = code.match(pattern);
    if (matches == null) {
      throw new Error("Contract name was not found!");
    } else {
      matches.forEach(function (match, index, array) {
        names.push(match.split(" ")[1]);
      });
      return names;
    }
  }

  prepareResultForm(response: CompileResponse): void {
    this.compilationResultsForm = new FormGroup({
      objects: new FormArray([]),
      errors: new FormControl()
    });
    if (response['error']) {
      this.compilationResultsForm.get('errors').patchValue(response['error']);
    } else {
      let objects = <FormArray>this.compilationResultsForm.get('objects');
      let compiledObjects = <Array<CompiledObject>>response['objects'];
      for (let object of compiledObjects) {
        objects.push(new FormGroup({
          objectsName: new FormControl(object['objectname']),
          abi: new FormControl(object['abi']),
          bytecode: new FormControl(object['bytecode'])
        }));
      }
    }
  }

  onDownload(download: FormGroup): void {
    let name = download.get('objectsName').value;
    let bytecode = download.get('bytecode').value;
    let abi = download.get('abi').value;
    this.download(bytecode, name + "_bytecode");
    this.download(abi, name + "_abi.json");
  }

  private download(content: string, name: string): void {
    let reader = new FileReader();
    let blob = new Blob([this.stringToByteArray(content)]);
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      let a = document.createElement("a");
      document.body.appendChild(a);
      a.setAttribute("style", "display: none");
      a.href = reader.result;
      a.target = '_blank';
      a.download = name;
      a.click();
      document.body.removeChild(a);
    }
  }

  private stringToByteArray(content: string): Uint16Array {
    let buf = new ArrayBuffer(content.length * 2); // 2 bytes for each char
    let bufView = new Uint16Array(buf);
    for (let i = 0, strLen = content.length; i < strLen; i++) {
      bufView[i] = content.charCodeAt(i);
    }
    return bufView;
  }

}

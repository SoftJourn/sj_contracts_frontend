export class CompileObject {
  public objectNames: Array<string>;
  public script: string;

  constructor(objectNames?: Array<string>,
              script?: string) {
    this.objectNames = objectNames;
    this.script = script;
  }
}

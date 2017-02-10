export class CompileRequest {

  public name: string;
  public language: string;
  public includes: Object;
  public libraries: string;
  public optimize: boolean;
  public replacement: Object;

  constructor(name?: string,
              language?: string,
              includes?: Object,
              libraries?: string,
              optimize?: boolean,
              replacement?: Object) {
    this.name = name;
    this.language = language;
    this.includes = includes;
    this.libraries = libraries;
    this.optimize = optimize;
    this.replacement = replacement;
  }
}

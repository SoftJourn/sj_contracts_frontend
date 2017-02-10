import {Injectable} from "@angular/core";
import {AppProperties} from "../shared/app.properties";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {CompileRequest} from "../entity/compile-request";

@Injectable()
export class CompileService {

  constructor(public http: Http) {
  }

  protected getUrl(): string {
    return `${AppProperties.ERIS_COMPILER}`;
  }

  public compile(compileRequestObject: CompileRequest): Observable<Object> {
    return this.http.post(this.getUrl(), compileRequestObject).map(response => response.json());
  }

}

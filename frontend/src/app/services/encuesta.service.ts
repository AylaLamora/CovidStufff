import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Encuesta } from '../../models/encuesta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EncuestaService {
  readonly URL = 'http://localhost:3501/encuesta';

  // URL_SERVIDOR
  // readonly URL = 'https://bar-sandbox.herokuapp.com/bebidas';

  info: any = [];

  selectBebida: Encuesta;
  DatosBebidas: Encuesta[];

  constructor(private http: HttpClient) {
    this.http.get(this.URL).subscribe((resp: any) => {
      this.info = resp;
    });
  }
  postDatos(bebida: any) {
    return this.http.post(this.URL, bebida);
  }

  getDatosList() {
    return this.http.get(this.URL);
  }

  putDatos(enc: Encuesta) {
    return this.http.put(this.URL + `/${enc._id}`, enc);
  }
  deleteDato(_id: string) {
    return this.http.delete(this.URL + `/${_id}`);
  }
}

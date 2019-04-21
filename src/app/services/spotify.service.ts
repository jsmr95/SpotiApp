import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient) {
   console.log('Spotify service listo!')
 }

 getQuery(query:string){
   const url = `https://api.spotify.com/v1/${query}`;
   const headers = new HttpHeaders({
     //El token solo dura una hora, habri que volver a generarlo en
     // https://developer.spotify.com/console/get-new-releases/
     'Authorization': 'Bearer BQAB1oJk8T2QQ_WcWb_CVD3Yzrg7-sdPkEN-_Yo81vfaE5SH_gs3HQ2-4DlZW5tT3h7yC-ziMfBah5GiRGRCZtW9dw7k4rXZW6HOVUiMUfYhk_3X5Mi_kfqStJ0SOmkoDeV1l9Qk7pVVoyg',
   });
   return this.http.get(url, {headers});
 }

 getNewReleases(){
  return this.getQuery('browse/new-releases').pipe( map( data => data['albums'].items ) );
 }

 getArtistas (termino: string){
   return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
   .pipe( map( data => data['artists'].items  ) );
 }

 getArtista (id: string){
   return this.getQuery(`artists/${id}`);
   // .pipe( map( data => data['artists'].items  ) ); Ya viene la info transformada, no hay que pasarla por el pipe
 }

}

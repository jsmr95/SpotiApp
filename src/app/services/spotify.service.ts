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
     'Authorization': 'Bearer BQDuUe3rf3V6n2_e-E8nDd15CSgdiZwcV19DftVAhxHcXt87ITIHC0LFWWj0Y6raSSqmDtkRrVOWVASG86GLYLEouHE-_j-8nAFo6eUvHRQEytXc5BI6nrq7tbJD3o3RtHJEkeSARcJKnaE',
   });
   return this.http.get(url, {headers});
 }

 getNewReleases(){
  return this.getQuery('browse/new-releases').pipe( map( data => data['albums'].items ) );
 }

 getArtista (termino: string){
   return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
   .pipe( map( data => data['artists'].items  ) );
 }
}

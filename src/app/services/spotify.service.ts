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
     'Authorization': 'Bearer BQCdAHSd47-KvpuUtP_HjnrotiRaHhoXfx5mqTybCtRTbD3H64_H6K_1HqQACQAf3yRILP3sm2KjNfLoN28pM-uvk87fwnTfdaPFv3Mme5b8RC_Wqbtp5TAtwUWFct0hVdwvQl7f8kZnch0',
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

 getTopTracks (id: string){
   return this.getQuery(`artists/${id}/top-tracks?country=us`)
   .pipe( map( data => data['tracks']  ) );
 }

}

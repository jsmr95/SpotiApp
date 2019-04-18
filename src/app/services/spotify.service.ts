import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient) {
   console.log('Spotify service listo!')
 }

 getNewReleases(){
  const headers = new HttpHeaders({
    'Authorization': 'Bearer BQCw_u1GINbdTgaJWxU9kqgdn3rb5a9xpFGl0siKrXPVnSjx7jtUes5vfTFuW258C8xnz2chadDCn8uurAwlLACjnRI9Km3kbcth_2abrYgWpulTLLwVe7Nf-VTBKWm_bGu1IpAEHbaBqAU',
  })
  this.http.get('https://api.spotify.com/v1/browse/new-releases', {headers})
    .subscribe(data => {
      console.log(data);
    });
 }
}

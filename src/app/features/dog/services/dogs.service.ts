import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DogsService {
  private apiUrl = 'https://dog.ceo/api';
  http: HttpClient = inject(HttpClient);
  // Get all dogs
  getAllDogs(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/breeds/list/all`);
  }
  // Get all images of a specific breed
  getDogByBreed(breed: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/breed/${breed}/images`);
  }
  // Get sub-breeds of a specific breed
  getDogBySubBreed(breed: string, subBreed: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/breed/${breed}/${subBreed}/images`
    );
  }
  // Get all dog sub-breeds of a specific breed
  getDogSubBreeds(breed: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/breed/${breed}/list`);
  }
}

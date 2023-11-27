import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { createClient } from '@supabase/supabase-js';
import { SupabaseClient } from '@supabase/supabase-js';


@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private apiUrl = 'https://vteqqtolbljlxgzhfwvn.supabase.co'; // Reemplaza con tu URL de Supabase
  private apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0ZXFxdG9sYmxqbHhnemhmd3ZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU2NTU5OTYsImV4cCI6MjAxMTIzMTk5Nn0.9RM58EOS1oSZKm24ChkLJn5TxoXnJXSBfq6-WlV_FEc'; // Reemplaza con tu clave de API

  constructor(private http: HttpClient, private supabase: SupabaseClient) {
    
    
  }

  public getData() {
    const headers = new HttpHeaders({
      'apikey': this.apiKey
    });

    return this.http.get(`${this.apiUrl}/Testing`, { headers });
  }



}

const supabaseUrl = 'https://vteqqtolbljlxgzhfwvn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0ZXFxdG9sYmxqbHhnemhmd3ZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU2NTU5OTYsImV4cCI6MjAxMTIzMTk5Nn0.9RM58EOS1oSZKm24ChkLJn5TxoXnJXSBfq6-WlV_FEc';

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
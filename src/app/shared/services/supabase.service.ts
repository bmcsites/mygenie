import { Injectable } from '@angular/core'
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from '@env/environment';

export interface Profile {
  id?: string
  username: string
  website: string
  avatar_url: string
}

@Injectable({
  providedIn: 'root',
})

export class SupabaseService {
  private supabase: SupabaseClient
  _session: AuthSession | null = null

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    // this.supabase.storage.
  }

  get session() {
    this.supabase.auth.getSession().then(({ data}) => {
      this._session = data.session;
      console.log('session: ', this._session)
    })
    return this._session
  }

  profile(user: User) {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single()
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }

  signIn(email: string) {
    return this.supabase.auth.signInWithOtp({ email })
  }

  async signInWithEmail(email: string, password: string) {
    return await this.supabase.auth.signInWithPassword({
      email: email,
      password: password
    })
  }

  signOut() {
    return this.supabase.auth.signOut()
  }

  updateProfile(profile: Profile) {
    const update = {
      ...profile,
      updated_at: new Date(),
    }

    return this.supabase.from('profiles').upsert(update)
  }

  async updatePassword(password: string) {
    return await this.supabase.auth.updateUser({password: password})
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatars').download(path)
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatars').upload(filePath, file)
  }

  async getTopics() {
    try {
      const fulfilledValue = await this.supabase.from('topics').select('*');
      return fulfilledValue;
    } catch (e) {
      console.log('error');
      return null;
    }
  }


}

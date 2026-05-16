export type UserRole = 'admin' | 'staff' | 'member';

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  updated_at: string;
}

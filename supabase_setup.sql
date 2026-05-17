-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  full_name text,
  avatar_url text,
  role text check (role in ('admin', 'staff', 'member')) default 'member',

  constraint full_name_length check (char_length(full_name) >= 3)
);

-- Set up Row Level Security (RLS)
alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', 'member');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create savings table
create table savings (
  id uuid default gen_random_uuid() primary key,
  member_id uuid references profiles(id) on delete cascade not null,
  amount decimal(12,2) not null check (amount >= 0),
  transaction_type text check (transaction_type in ('DEPOSIT', 'WITHDRAWAL')) not null,
  status text check (status in ('PENDING', 'COMPLETED', 'FAILED')) default 'COMPLETED',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create loans table
create table loans (
  id uuid default gen_random_uuid() primary key,
  member_id uuid references profiles(id) on delete cascade not null,
  amount decimal(12,2) not null check (amount > 0),
  interest_rate decimal(5,2) not null,
  duration_months integer not null check (duration_months > 0),
  purpose text,
  status text check (status in ('PENDING', 'APPROVED', 'DISBURSED', 'REPAID', 'REJECTED')) default 'PENDING',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create transactions table (general ledger/audit log)
create table transactions (
  id uuid default gen_random_uuid() primary key,
  member_id uuid references profiles(id) on delete cascade not null,
  type text check (type in ('SAVINGS', 'LOAN_REPAYMENT')) not null,
  amount decimal(12,2) not null check (amount > 0),
  mpesa_receipt text unique,
  status text check (status in ('PENDING', 'COMPLETED', 'FAILED')) default 'PENDING',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create guarantors table
create table guarantors (
  id uuid default gen_random_uuid() primary key,
  loan_id uuid references loans(id) on delete cascade not null,
  guarantor_id uuid references profiles(id) on delete cascade not null,
  status text check (status in ('PENDING', 'APPROVED', 'REJECTED')) default 'PENDING',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(loan_id, guarantor_id)
);

-- Set up Row Level Security (RLS)
alter table savings enable row level security;
alter table loans enable row level security;
alter table transactions enable row level security;
alter table guarantors enable row level security;

-- Savings Policies
create policy "Members can view their own savings." on savings for select using (auth.uid() = member_id);
create policy "Admins can view all savings." on savings for select using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Loans Policies
create policy "Members can view their own loans." on loans for select using (auth.uid() = member_id);
create policy "Members can apply for loans." on loans for insert with check (auth.uid() = member_id);
create policy "Admins and Staff can view all loans." on loans for select using (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'staff'))
);
create policy "Admins and Staff can update loans." on loans for update using (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'staff'))
);

-- Transactions Policies
create policy "Members can view their own transactions." on transactions for select using (auth.uid() = member_id);
create policy "Members can create transactions." on transactions for insert with check (auth.uid() = member_id);
create policy "Admins and Staff can view all transactions." on transactions for select using (
  exists (select 1 from profiles where id = auth.uid() and role in ('admin', 'staff'))
);

-- Guarantors Policies
create policy "Members can view their guarantor requests." on guarantors for select using (
  auth.uid() = guarantor_id or exists (select 1 from loans where id = loan_id and member_id = auth.uid())
);
create policy "Guarantors can update their status." on guarantors for update using (auth.uid() = guarantor_id);


-- Seed data for testing Omix SACCO

-- Note: You need to replace the UUIDs below with real IDs from your auth.users table if you want them to link to real users.
-- Or just run this to see how the UI handles existing data.

-- 1. Create a dummy member if one doesn't exist (assuming you have a user id)
-- INSERT INTO public.profiles (id, full_name, role) VALUES ('<some-user-id>', 'Test Member', 'member');

-- 2. Add some savings
INSERT INTO public.savings (member_id, amount, transaction_type, created_at)
SELECT 
  id, 
  10000, 
  'DEPOSIT', 
  now() - interval '5 months'
FROM public.profiles WHERE role = 'member' LIMIT 1;

INSERT INTO public.savings (member_id, amount, transaction_type, created_at)
SELECT 
  id, 
  15000, 
  'DEPOSIT', 
  now() - interval '4 months'
FROM public.profiles WHERE role = 'member' LIMIT 1;

INSERT INTO public.savings (member_id, amount, transaction_type, created_at)
SELECT 
  id, 
  20000, 
  'DEPOSIT', 
  now() - interval '3 months'
FROM public.profiles WHERE role = 'member' LIMIT 1;

-- 3. Add some transactions
INSERT INTO public.transactions (member_id, type, amount, mpesa_receipt, status, created_at)
SELECT 
  id, 
  'SAVINGS', 
  20000, 
  'MPESA12345', 
  'COMPLETED', 
  now() - interval '3 months'
FROM public.profiles WHERE role = 'member' LIMIT 1;

-- 4. Add a pending loan
INSERT INTO public.loans (member_id, amount, interest_rate, duration_months, purpose, status, created_at)
SELECT 
  id, 
  50000, 
  12.5, 
  12, 
  'School fees for kids', 
  'PENDING', 
  now() - interval '1 day'
FROM public.profiles WHERE role = 'member' LIMIT 1;

-- 5. Add an approved loan
INSERT INTO public.loans (member_id, amount, interest_rate, duration_months, purpose, status, created_at)
SELECT 
  id, 
  120000, 
  12.5, 
  24, 
  'Business expansion', 
  'DISBURSED', 
  now() - interval '2 months'
FROM public.profiles WHERE role = 'member' LIMIT 1;

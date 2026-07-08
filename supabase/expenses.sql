create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  payer_id text not null,
  payer_name text not null,
  amount integer not null,
  shared_member_ids text[] not null,
  shared_member_names text[] not null,
  split_amount integer not null,
  created_at timestamptz not null default now()
);

alter table public.expenses enable row level security;

drop policy if exists "Allow public read expenses" on public.expenses;
drop policy if exists "Allow public insert expenses" on public.expenses;
drop policy if exists "Allow public delete expenses" on public.expenses;

create policy "Allow public read expenses"
on public.expenses
for select
using (true);

create policy "Allow public insert expenses"
on public.expenses
for insert
with check (true);

create policy "Allow public delete expenses"
on public.expenses
for delete
using (true);

do $$
begin
  alter publication supabase_realtime add table public.expenses;
exception
  when duplicate_object then null;
end $$;

create extension if not exists pgcrypto;

create table if not exists public.micro_tool_ideas (
  id text primary key,
  title text not null,
  category text not null,
  summary text not null,
  details text not null,
  rating smallint not null default 0 check (rating between 0 and 3),
  note text not null default '',
  is_custom boolean not null default false,
  sort_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_micro_tool_ideas_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_micro_tool_ideas_updated_at on public.micro_tool_ideas;
create trigger trg_micro_tool_ideas_updated_at
before update on public.micro_tool_ideas
for each row
execute function public.set_micro_tool_ideas_updated_at();

alter table public.micro_tool_ideas enable row level security;

drop policy if exists "Public read access" on public.micro_tool_ideas;
create policy "Public read access"
on public.micro_tool_ideas
for select
using (true);

drop policy if exists "Public insert access" on public.micro_tool_ideas;
create policy "Public insert access"
on public.micro_tool_ideas
for insert
with check (true);

drop policy if exists "Public update access" on public.micro_tool_ideas;
create policy "Public update access"
on public.micro_tool_ideas
for update
using (true)
with check (true);

drop policy if exists "Public delete access" on public.micro_tool_ideas;
create policy "Public delete access"
on public.micro_tool_ideas
for delete
using (true);

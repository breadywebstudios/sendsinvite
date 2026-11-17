-- Invitation Studio: database setup for the standalone website.
-- Run once in the Supabase SQL editor (or as a migration). Safe to run again.
-- Everything is prefixed inv_ so it can live beside other apps in one project.

create table if not exists public.inv_invites (
  id text primary key check (id ~ '^[A-Za-z0-9_~.-]{6,40}$'),
  owner uuid not null default auth.uid(),
  data jsonb not null check (pg_column_size(data) < 200000),
  updated_at timestamptz not null default now()
);
create index if not exists inv_invites_owner_idx on public.inv_invites (owner);
alter table public.inv_invites enable row level security;

drop policy if exists "inv hosts read own invitations" on public.inv_invites;
create policy "inv hosts read own invitations" on public.inv_invites
  for select to authenticated using (owner = (select auth.uid()));
drop policy if exists "inv hosts add own invitations" on public.inv_invites;
create policy "inv hosts add own invitations" on public.inv_invites
  for insert to authenticated with check (owner = (select auth.uid()));
drop policy if exists "inv hosts change own invitations" on public.inv_invites;
create policy "inv hosts change own invitations" on public.inv_invites
  for update to authenticated using (owner = (select auth.uid())) with check (owner = (select auth.uid()));
drop policy if exists "inv hosts delete own invitations" on public.inv_invites;
create policy "inv hosts delete own invitations" on public.inv_invites
  for delete to authenticated using (owner = (select auth.uid()));

create table if not exists public.inv_rsvps (
  invite_id text not null,
  guest_key text not null,
  reply jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (invite_id, guest_key)
);
alter table public.inv_rsvps enable row level security;

-- Only the host of an invitation can read its replies. Guests never read this table directly.
drop policy if exists "inv hosts read replies to own invitations" on public.inv_rsvps;
create policy "inv hosts read replies to own invitations" on public.inv_rsvps
  for select to authenticated using (
    exists (select 1 from public.inv_invites i where i.id = inv_rsvps.invite_id and i.owner = (select auth.uid()))
  );

-- Guests have no account. They open one invitation by its link id, and keep a private key in
-- their browser so they can see and change their own reply later.
create or replace function public.inv_get_invite(p_id text)
returns jsonb language sql stable security definer set search_path = '' as $$
  select i.data from public.inv_invites i where i.id = p_id;
$$;

create or replace function public.inv_get_reply(p_invite text, p_key text)
returns jsonb language sql stable security definer set search_path = '' as $$
  select r.reply from public.inv_rsvps r where r.invite_id = p_invite and r.guest_key = p_key;
$$;

create or replace function public.inv_save_reply(p_invite text, p_key text, p_reply jsonb)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if p_key is null or length(p_key) < 24 or length(p_key) > 80 then raise exception 'bad guest key'; end if;
  if p_reply is null or jsonb_typeof(p_reply) <> 'object' or pg_column_size(p_reply) > 8000 then raise exception 'bad reply'; end if;
  if not exists (select 1 from public.inv_invites i where i.id = p_invite) then raise exception 'invitation not found'; end if;
  if not exists (select 1 from public.inv_rsvps r where r.invite_id = p_invite and r.guest_key = p_key)
     and (select count(*) from public.inv_rsvps r where r.invite_id = p_invite) >= 3000 then
    raise exception 'this invitation has reached its reply limit';
  end if;
  insert into public.inv_rsvps (invite_id, guest_key, reply, updated_at) values (p_invite, p_key, p_reply, now())
  on conflict (invite_id, guest_key) do update set reply = excluded.reply, updated_at = now();
end;
$$;

revoke all on function public.inv_get_invite(text) from public;
revoke all on function public.inv_get_reply(text, text) from public;
revoke all on function public.inv_save_reply(text, text, jsonb) from public;
grant execute on function public.inv_get_invite(text) to anon, authenticated;
grant execute on function public.inv_get_reply(text, text) to anon, authenticated;
grant execute on function public.inv_save_reply(text, text, jsonb) to anon, authenticated;

-- Photos that hosts upload. Public to view by link, and each host can only write inside their own folder.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('inv-photos', 'inv-photos', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

drop policy if exists "inv hosts upload photos to own folder" on storage.objects;
create policy "inv hosts upload photos to own folder" on storage.objects
  for insert to authenticated with check (bucket_id = 'inv-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
drop policy if exists "inv hosts delete own photos" on storage.objects;
create policy "inv hosts delete own photos" on storage.objects
  for delete to authenticated using (bucket_id = 'inv-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);

-- Link names: a host can give an invitation a readable address such as /emma-oliver-wedding.
-- The name is unique across all invitations, so a second host asking for a taken name is refused.
alter table public.inv_invites add column if not exists slug text;
do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'inv_invites_slug_format') then
    alter table public.inv_invites add constraint inv_invites_slug_format
      check (slug is null or (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and length(slug) between 3 and 60));
  end if;
end $$;
create unique index if not exists inv_invites_slug_key on public.inv_invites (slug) where slug is not null;

-- Guests open an invitation by its link name.
create or replace function public.inv_find_invite(p_slug text)
returns jsonb language sql stable security definer set search_path = '' as $$
  select jsonb_build_object('id', i.id, 'data', i.data) from public.inv_invites i where i.slug = lower(p_slug);
$$;
-- Hosts check whether a link name is free before saving it (true when no other invitation has it).
create or replace function public.inv_link_free(p_slug text, p_id text)
returns boolean language sql stable security definer set search_path = '' as $$
  select not exists (select 1 from public.inv_invites i where i.slug = lower(p_slug) and i.id <> coalesce(p_id, ''));
$$;
revoke all on function public.inv_find_invite(text) from public;
revoke all on function public.inv_link_free(text, text) from public;
grant execute on function public.inv_find_invite(text) to anon, authenticated;
grant execute on function public.inv_link_free(text, text) to authenticated;

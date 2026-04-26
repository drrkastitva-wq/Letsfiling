-- Letsfiling MVP initial schema (PostgreSQL)

create extension if not exists "uuid-ossp";

create table users (
  id uuid primary key default uuid_generate_v4(),
  role text not null check (role in ('client', 'admin', 'executive', 'professional')),
  full_name text,
  mobile varchar(20) unique not null,
  email text,
  created_at timestamptz not null default now()
);

create table services (
  id uuid primary key default uuid_generate_v4(),
  code text unique not null,
  name text not null,
  description text,
  base_price numeric(10,2),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table leads (
  id uuid primary key default uuid_generate_v4(),
  client_user_id uuid not null references users(id),
  service_id uuid not null references services(id),
  source text not null default 'app',
  company_name text,
  status text not null default 'new',
  assigned_to uuid references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table lead_documents (
  id uuid primary key default uuid_generate_v4(),
  lead_id uuid not null references leads(id) on delete cascade,
  doc_type text not null,
  file_url text not null,
  verified boolean not null default false,
  uploaded_at timestamptz not null default now()
);

create table tasks (
  id uuid primary key default uuid_generate_v4(),
  lead_id uuid not null references leads(id) on delete cascade,
  title text not null,
  assigned_to uuid references users(id),
  status text not null default 'todo',
  due_at timestamptz,
  created_at timestamptz not null default now()
);

create table payments (
  id uuid primary key default uuid_generate_v4(),
  lead_id uuid not null references leads(id) on delete cascade,
  gateway text not null,
  gateway_order_id text,
  amount numeric(10,2) not null,
  currency varchar(10) not null default 'INR',
  status text not null default 'created',
  created_at timestamptz not null default now()
);

create index idx_leads_status on leads(status);
create index idx_leads_assigned_to on leads(assigned_to);
create index idx_tasks_assigned_to on tasks(assigned_to);

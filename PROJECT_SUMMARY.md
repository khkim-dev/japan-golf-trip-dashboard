# Project Summary

## Project

Japan Golf Trip Dashboard

## Deployment

https://khkim-dev.github.io/japan-golf-trip-dashboard/

## Current Status

GitHub Pages deployment is active.

## Completed

- Overview
- Members
- Booking
- Yardage Book
- Fairway Balance UI MVP
- GitHub Pages deployment
- Supabase project preparation
- Supabase `expenses` table
- Supabase expense insert / select / delete validation
- Fairway Balance Realtime subscription implementation
- Fairway Balance Broadcast sync fallback

## Current Mission

Mission 4. Supabase Realtime Sync - implementation complete

## Architecture

Users -> GitHub Pages -> React -> Supabase -> Database

## Current Focus

Fairway Balance shared settlement data.

## Decisions

- Balance feature name changed from The 19th Hole to Fairway Balance.
- Expense calculation logic stays in `src/utils/settlement.js`.
- Supabase handles shared expense storage.
- Fairway Balance uses Supabase Broadcast as a realtime fallback between open clients.
- Yardage Book uses original SVG-style course maps instead of copied course images.

## Supabase

- Project URL is configured through `VITE_SUPABASE_URL`.
- Publishable key is configured through `VITE_SUPABASE_PUBLISHABLE_KEY`.
- Local values live in `.env.local`.
- GitHub Pages build values are provided in `.github/workflows/deploy.yml`.
- `expenses` table is created in Supabase.
- Public read / insert / delete RLS policies are enabled for MVP usage.
- Insert / select / delete smoke test passed on 2026-07-09.
- React app subscribes to Supabase `INSERT` and `DELETE` events for `expenses`.
- Supabase Postgres Changes subscribed but did not emit events during validation, so Broadcast is also used for app-originated insert / delete sync.
- Broadcast client-to-client validation passed on 2026-07-10.

## Pending

- Validate Broadcast sync from the deployed GitHub Pages site with two browser/mobile sessions.
- Run `supabase/expenses.sql` again or confirm Supabase Realtime table publication if Postgres Changes events are still needed later.
- Run multi-device mobile validation.

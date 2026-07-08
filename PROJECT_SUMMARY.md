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

## Current Mission

Mission 3. Supabase Connection - validation complete

## Architecture

Users -> GitHub Pages -> React -> Supabase -> Database

## Current Focus

Fairway Balance shared settlement data.

## Decisions

- Balance feature name changed from The 19th Hole to Fairway Balance.
- Expense calculation logic stays in `src/utils/settlement.js`.
- Supabase handles shared expense storage.
- Yardage Book uses original SVG-style course maps instead of copied course images.

## Supabase

- Project URL is configured through `VITE_SUPABASE_URL`.
- Publishable key is configured through `VITE_SUPABASE_PUBLISHABLE_KEY`.
- Local values live in `.env.local`.
- GitHub Pages build values are provided in `.github/workflows/deploy.yml`.
- `expenses` table is created in Supabase.
- Public read / insert / delete RLS policies are enabled for MVP usage.
- Insert / select / delete smoke test passed on 2026-07-09.

## Pending

- Validate insert / delete from the deployed GitHub Pages site.
- Add Supabase Realtime sync.
- Run multi-device mobile validation.

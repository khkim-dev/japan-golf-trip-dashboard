# Japan Golf Trip Dashboard

Fairway Travel Command Board

## Overview

Japan Golf Trip Dashboard는 친구 7명이 함께 떠나는 일본 골프여행을 준비하고 기록하기 위한 모바일 웹 대시보드입니다.

이 프로젝트는 여행 일정, 항공편, 예약 정보, 비용 정산을 관리하는 도구이면서, 친구들과의 시간을 더 잘 기억하기 위한 작은 디지털 앨범을 목표로 합니다.

## Current Status

Mission 8까지 완료했습니다.

- Vite + React 프로젝트 생성
- 분위기 있는 일본 골프여행 Landing 배경 구현
- Countdown 표시
- 7명 멤버 이름 표시
- Members, Schedule, Booking, Balance 섹션 이동 구조 구현
- Members 탭에 7명 프로필 카드 표시
- 프로필 이미지를 `public/images/profiles`에 저장
- Schedule 탭에 2026-10-06부터 2026-10-10까지 날짜별 일정 표시
- Schedule 탭 상단에 멤버별 출국/입국 항공 일정 게시
- Booking 탭에 숙소/골프장/항공 예약 요약 표시
- Balance 탭에 지출 입력 폼과 비용 목록 표시

아직 최종 정산 계산과 공유 데이터 연동은 구현하지 않습니다.

## Data Strategy

이 앱은 카카오톡 단체방에 공유되는 현황판이므로, `localStorage`를 핵심 저장 방식으로 사용하지 않습니다.

```text
v1.0: mock data + GitHub Pages 배포
v1.1: Google Sheets 같은 공유 데이터 소스 연동 검토
v1.2: 입력/수정 권한 관리 검토
```

`localStorage`는 개인 브라우저에만 저장되므로, 모든 친구가 같은 최신 현황을 보는 목적에는 맞지 않습니다.

## Tech Stack

- Vite
- React
- CSS
- Git / GitHub
- GitHub Pages

## Run

PowerShell 보안 정책 때문에 `npm` 대신 `npm.cmd`를 사용합니다.

```powershell
npm.cmd install
npm.cmd run dev
```

Codex 세션에서 PATH가 갱신되지 않은 경우:

```powershell
$env:Path = 'C:\Program Files\nodejs;' + $env:Path
& 'C:\Program Files\nodejs\npm.cmd' run dev
```

## Mission Flow

```text
구현 -> 실행 -> 코치 리뷰 -> Commit -> Push -> 다음 Mission
```

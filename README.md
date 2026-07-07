# Japan Golf Trip Dashboard

Fairway Travel Command Board

## Overview

Japan Golf Trip Dashboard는 친구 7명이 함께 떠나는 일본 나고야 골프 여행을 준비하고 공유하기 위한 모바일 웹 대시보드입니다.

이 프로젝트는 단순한 일정표가 아니라, 여행 정보와 정산 기능을 한곳에 모으고 친구들과의 시간을 더 잘 준비하기 위한 작은 디지털 보드입니다.

## Current Status

Mission 8 기준으로 아래 기능을 구현했습니다.

- Vite + React 프로젝트 구성
- 모바일 중심 탭 구조
- 나고야 여행 분위기의 Landing 화면
- Countdown 표시
- Members 카드형 UI
- Overview 이미지형 인포그래픽 보드
- Booking 숙소/골프장 정보와 지도 링크
- The 19th Hole 정산 대시보드

## Design Strategy

현재 디자인 방향은 하이브리드 방식입니다.

```text
Members  -> 카드형 React UI 유지
Overview -> 이미지형 인포그래픽 자산 + 웹 UI
Booking  -> 지도 링크와 실제 정보 확인을 위해 React UI 유지
The 19th Hole -> 입력, 계산, 삭제, 최종 송금 제안이 필요하므로 React UI 유지
```

Overview는 항공, 일정, 예약 요약을 한 번에 보여주는 핵심 인포그래픽 보드로 사용합니다.

Booking과 The 19th Hole은 사용자가 정보를 확인하거나 입력해야 하므로 기능성과 접근성을 우선합니다.

## Balance Concept

정산 화면은 `The 19th Hole`이라는 이름을 사용합니다.

단순한 N빵 계산기가 아니라, 골프 라운드 후 클럽하우스에서 스코어를 확인하는 듯한 프리미엄 대시보드를 목표로 합니다.

핵심 기능:

- 멤버별 Score Card
- Total Expense / Transactions / Highest Payer / Average Cost
- Live Transaction Feed
- Transaction Delete
- Who Owes Who 최종 송금 제안
- 엔화(JPY) 기준 금액 표시
- React State 기반 v1.0 정산 엔진

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

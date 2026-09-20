# Japan Golf Trip Dashboard

Fairway Travel Command Board

## Overview

Japan Golf Trip Dashboard는 친구 6명이 함께 떠나는 일본 나고야 골프 여행을 준비하고 공유하기 위한 모바일 웹 대시보드입니다.

이 프로젝트는 여행 정보와 골프 준비 정보를 한곳에 모아 친구들과 공유하기 위한 작은 디지털 보드입니다.

## Current Status

현재 구현된 주요 기능은 아래와 같습니다.

- Vite + React 프로젝트 구성
- 모바일 중심 탭 구조
- 나고야 여행 분위기의 Landing 화면
- Countdown 표시
- Yardage Book 모바일 코스북
- Overview 이미지형 인포그래픽 보드
- Booking 숙소/골프장 정보와 지도 링크

## Design Strategy

현재 디자인 방향은 하이브리드 방식입니다.

```text
Overview      -> 이미지형 인포그래픽 자산 + 웹 UI
Yardage Book  -> 캐디 없는 라운드를 위한 홀별 코스북
Booking       -> 지도 링크와 실제 정보 확인을 위해 React UI 유지
```

Overview는 항공, 일정, 예약 요약을 한 번에 보여주는 핵심 인포그래픽 보드로 사용합니다.

Overview와 Booking은 사용자가 여행 정보를 빠르게 확인할 수 있도록 기능성과 접근성을 우선합니다.

## Yardage Book

Yardage Book은 일본 골프장의 캐디 없는 라운드를 고려한 모바일 코스북입니다.

v1.0 범위:

- 10/8 골프5 컨트리 미즈나미 코스
- 10/9 하나노키 골프 클럽
- 홀별 Par
- 홀별 거리(m)
- 통일된 애니메이션풍 홀 이미지
- 홀별 공략 메모

현재 홀별 거리와 메모는 코스북 초안이며, 라운드 전 공식 스코어카드 기준으로 최종 확인합니다.

## Data Strategy

현재 앱은 별도 백엔드 없이 GitHub Pages에서 여행 정보를 읽기 전용 현황판으로 제공합니다.

```text
GitHub Pages -> React static dashboard
```

## Deploy

GitHub Pages 배포 주소:

```text
https://khkim-dev.github.io/japan-golf-trip-dashboard/
```

배포 방식:

```text
main branch push -> GitHub Actions build -> GitHub Pages deploy
```

GitHub 저장소 Settings에서 Pages Source가 `GitHub Actions`로 설정되어 있어야 합니다.

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

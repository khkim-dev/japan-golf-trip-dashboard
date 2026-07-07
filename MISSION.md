# Mission Log

## Project

Japan Golf Trip Dashboard

## Mission 1. Project Initialization

| 항목 | 내용 |
| --- | --- |
| Status | Complete |
| Goal | Vite + React 프로젝트 구조와 기본 문서를 준비한다 |
| Learning Goal | Node.js, npm, Vite, React 프로젝트의 기본 구조를 이해한다 |
| Output | 실행 가능한 React 기본 화면과 프로젝트 문서 |

### Scope

- Vite + React 프로젝트 생성
- 의존성 설치
- 기본 실행 화면 정리
- README.md 작성
- MISSION.md 작성
- DECISION_LOG.md 작성
- RETROSPECTIVE.md 작성

### Done

- [x] Vite + React 프로젝트가 생성되었다.
- [x] `npm.cmd install`이 완료되었다.
- [x] 기본 화면에 `Mission 1 Ready`가 표시된다.
- [x] README, MISSION, DECISION_LOG, RETROSPECTIVE 초안이 준비되었다.
- [x] 다음 Mission에서 Landing 화면 구현을 시작할 수 있다.

### Recommended Commit

```text
docs: add golf trip dashboard mission plan
```

## Mission 2. Landing Screen

| 항목 | 내용 |
| --- | --- |
| Status | Complete |
| Goal | 여행 분위기가 느껴지는 모바일 첫 화면을 만든다 |
| Learning Goal | React 컴포넌트와 CSS로 첫 화면을 구성하는 방법을 이해한다 |
| Output | Landing UI |

### Done

- [x] `Japan Golf Trip 2026` 제목이 표시된다.
- [x] 여행 기간이 표시된다.
- [x] 7 Friends 정보가 표시된다.
- [x] Countdown 영역이 표시된다.
- [x] 모바일 화면에서 읽기 쉽다.

### Recommended Commit

```text
feat: add trip landing screen
```

## Mission 3. Mobile Layout

| 항목 | 내용 |
| --- | --- |
| Status | Complete |
| Goal | 모바일 우선 탭/섹션 구조를 만든다 |
| Learning Goal | React에서 화면 영역을 나누고 이동 구조를 만드는 방법을 이해한다 |
| Output | Mobile Shell UI |

### Done

- [x] 주요 화면으로 이동할 수 있는 구조가 있다.
- [x] Landing, Members, Schedule, Flights, Balance 영역을 구분한다.
- [x] 모바일 화면에서 버튼과 섹션이 겹치지 않는다.

### Recommended Commit

```text
feat: add mobile dashboard layout
```

## Mission 4. Member Profiles

| 항목 | 내용 |
| --- | --- |
| Status | Complete |
| Goal | 7명 mock 멤버 프로필을 표시한다 |
| Learning Goal | 배열 데이터를 컴포넌트로 분리해 반복 렌더링하는 방법을 이해한다 |
| Output | Member Profile 화면 |

### Done

- [x] 7명 멤버 프로필이 표시된다.
- [x] 이름, 닉네임, 역할, 이미지 영역이 있다.
- [x] 실제 개인정보 없이 mock data만 사용한다.

### Recommended Commit

```text
feat: add mock trip members
```

## Mission 5. Trip Schedule Board

| 항목 | 내용 |
| --- | --- |
| Status | Complete |
| Goal | 날짜별 Planner 화면을 만든다 |
| Learning Goal | 날짜별 데이터를 화면에 카드 형태로 표시하는 방법을 이해한다 |
| Output | Schedule Board |

### Done

- [x] 2026-10-06부터 2026-10-10까지 날짜가 표시된다.
- [x] 날짜별 주요 일정이 보인다.
- [x] 멤버별 출국/입국 차이를 표현할 수 있는 구조가 있다.

### Recommended Commit

```text
feat: add trip schedule board
```

## Mission 6. Flight Selection

| 항목 | 내용 |
| --- | --- |
| Status | Complete |
| Goal | 멤버별 출국/입국 항공 일정을 게시한다 |
| Learning Goal | 게시형 데이터를 카드 형태로 보여주는 방법을 이해한다 |
| Output | Flight Board |

### Done

- [x] 멤버별 출국 항공편이 표시된다.
- [x] 멤버별 입국 항공편이 표시된다.
- [x] 수정 UI 없이 게시용 카드로 표시된다.

### Recommended Commit

```text
feat: add member flight board
```

## Mission 7. Booking Summary

| 항목 | 내용 |
| --- | --- |
| Status | Complete |
| Goal | 숙소/골프장/항공 예약 mock 정보를 표시한다 |
| Learning Goal | 예약 데이터를 카드 형태로 구조화하는 방법을 이해한다 |
| Output | Booking Summary |

### Done

- [x] 숙소 예약 정보가 표시된다.
- [x] 골프장 예약 정보가 표시된다.
- [x] 항공 예약 요약 정보가 표시된다.

### Recommended Commit

```text
feat: add booking summary cards
```

## Mission 8. Expense Entry

| 항목 | 내용 |
| --- | --- |
| Status | Complete |
| Goal | 지출 항목, 지출자, 금액, 분담 멤버를 입력한다 |
| Learning Goal | 폼 입력과 리스트 추가 흐름을 이해한다 |
| Output | Expense Input |

### Done

- [x] 지출 내용을 입력할 수 있다.
- [x] 지출자를 선택할 수 있다.
- [x] 금액을 입력할 수 있다.
- [x] 분담 멤버를 체크할 수 있다.
- [x] 비용 항목이 목록에 추가된다.

### Recommended Commit

```text
feat: add expense entry form
```

## Mission 9. Settlement Calculation

| 항목 | 내용 |
| --- | --- |
| Status | Ready |
| Goal | 지출 목록을 기준으로 멤버별 낼 금액/받을 금액을 계산한다 |
| Learning Goal | 배열 데이터를 집계하고 순정산 결과를 계산하는 흐름을 이해한다 |
| Output | Fairway Balance Summary |

### Done

- [ ] 멤버별 총 부담금을 계산한다.
- [ ] 멤버별 총 결제금을 계산한다.
- [ ] 받을 금액 / 낼 금액이 표시된다.
- [ ] 정산 결과 요약이 표시된다.

### Recommended Commit

```text
feat: calculate trip balances
```

export const memberTimeline = [
  {
    member: '병화',
    outboundDate: '10/6',
    outboundDepart: '17:30',
    arrivalDate: '10/6',
    arrivalTime: '18:55',
    returnDate: '10/10',
    returnDepart: '19:55',
    returnArrive: '21:30',
    tone: 'full',
  },
  {
    member: '상회',
    outboundDate: '10/6',
    outboundDepart: '17:30',
    arrivalDate: '10/6',
    arrivalTime: '18:55',
    returnDate: '10/10',
    returnDepart: '19:55',
    returnArrive: '21:30',
    tone: 'full',
  },
  {
    member: '성호',
    outboundDate: '10/6',
    outboundDepart: '17:40',
    arrivalDate: '10/6',
    arrivalTime: '19:30',
    returnDate: '10/10',
    returnDepart: '20:30',
    returnArrive: '22:15',
    tone: 'full',
  },
  {
    member: '원일',
    outboundDate: '10/6',
    outboundDepart: '17:30',
    arrivalDate: '10/6',
    arrivalTime: '18:55',
    returnDate: '10/10',
    returnDepart: '19:55',
    returnArrive: '21:30',
    tone: 'full',
  },
  {
    member: '성문',
    outboundDate: '10/7',
    outboundDepart: '08:30',
    arrivalDate: '10/7',
    arrivalTime: '10:00',
    returnDate: '10/10',
    returnDepart: '19:55',
    returnArrive: '21:30',
    tone: 'short',
  },
  {
    member: '경환',
    outboundDate: '10/7',
    outboundDepart: '17:40',
    arrivalDate: '10/7',
    arrivalTime: '19:30',
    returnDate: '10/10',
    returnDepart: '20:30',
    returnArrive: '22:15',
    tone: 'late',
  },
  {
    member: '종혁',
    outboundDate: '10/7',
    outboundDepart: '17:40',
    arrivalDate: '10/7',
    arrivalTime: '19:30',
    returnDate: '10/10',
    returnDepart: '20:30',
    returnArrive: '22:15',
    tone: 'late',
  },
]

export const tripSchedule = [
  {
    date: '2026-10-06',
    label: '10월 6일',
    title: '나고야 도착',
    tags: ['도착', '숙소', '저녁 관광'],
    blocks: [
      { time: 'Evening', title: '나고야 도착 및 숙소 이동' },
      { time: 'Night', title: '짐 정리 후 근처 저녁 및 가벼운 관광' },
    ],
    items: [
      '숙소 이동 및 짐 정리',
      '근처에서 저녁 및 가벼운 관광',
    ],
  },
  {
    date: '2026-10-07',
    label: '10월 7일',
    title: '합류 & 자유시간',
    tags: ['합류', '자유시간'],
    blocks: [
      { time: 'AM', title: '오전 자유시간' },
      { time: 'PM', title: '오후 자유시간' },
      { time: 'Night', title: '전체 멤버 합류 후 저녁 일정' },
    ],
    items: [
      '오전 / 오후 자유시간',
      '전체 멤버 합류 후 저녁 일정',
    ],
  },
  {
    date: '2026-10-08',
    label: '10월 8일',
    title: '골프5 컨트리 미즈나미 코스',
    tags: ['렌트', '골프', '관광'],
    blocks: [
      { time: '10:20', title: '경환 · 종혁 · 상회' },
      { time: '10:28', title: '성호 · 성문 · 병화 · 원일' },
      { time: 'PM', title: '단체 관광' },
      { time: 'Night', title: '저녁 식사 및 다음날 일정 확인' },
    ],
    items: [
      '오전 렌트 후 단체골프 1일차',
      '오후 단체 관광',
      '저녁 식사 및 다음날 일정 확인',
    ],
  },
  {
    date: '2026-10-09',
    label: '10월 9일',
    title: '하나노키 골프 클럽',
    tags: ['골프', '관광', '마지막밤'],
    blocks: [
      { time: '10:12', title: '종혁 · 성호 · 병화' },
      { time: '10:20', title: '경환 · 상회 · 원일 · 성문' },
      { time: 'PM', title: '단체 관광' },
      { time: 'Night', title: '마지막 밤 일정' },
    ],
    items: [
      '오전 단체골프',
      '오후 단체 관광',
      '마지막 밤 일정',
    ],
  },
  {
    date: '2026-10-10',
    label: '10월 10일',
    title: '귀국 준비',
    tags: ['휴식', '렌트반납', '귀국'],
    blocks: [
      { time: 'AM', title: '휴식' },
      { time: 'PM', title: '마무리 관광 및 공항 이동' },
      { time: 'PM', title: '공항 렌트 반납' },
    ],
    items: [
      '오전 휴식',
      '마무리 관광',
      '공항 이동 및 렌트 반납',
    ],
  },
]

export const accommodations = [
  {
    date: '10/6',
    title: '베셀 인 사카에 스테이션',
    subtitle: 'Vessel Inn Sakae Station · ベッセルイン栄駅前',
    facts: [
      ['일정', '2026-10-06'],
      ['주소', '나고야 나카구 니시키 3-14-13'],
      ['연락처', '+81 52-955-3131'],
    ],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Vessel%20Inn%20Sakae%20Station%20Nagoya',
  },
  {
    date: '10/7 - 10/10',
    title: '패밀리 스위트 사파리 리트리트',
    subtitle: 'Family Suite의 Safari Retreat · Airbnb',
    facts: [
      ['일정', '2026-10-07 ~ 2026-10-10'],
      ['주소', '나고야 아이치현 히가시사쿠라 2-17-15'],
      ['비고', 'Airbnb 예약 숙소'],
    ],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=2-chome-17-15%20Higashisakura%20Nagoya%20Aichi%20461-0005',
  },
]

export const golfRounds = [
  {
    date: '10/8',
    course: '골프5 컨트리 미즈나미 코스',
    courseMeta: 'Golf5 Country Mizunami Course · ゴルフ5カントリーみずなみコース',
    facts: [
      ['일정', '2026-10-08'],
      ['주소', '기후현 미즈나미시 카마도초 오보라 2383-1'],
      ['비고', '오전 라운드'],
    ],
    mapUrl: 'https://maps.app.goo.gl/ytEXsrV4cVJZuNfy5?g_st=akt',
    teams: [
      { time: '10:20', members: ['경환', '종혁', '상회'] },
      { time: '10:28', members: ['성호', '성문', '병화', '원일'] },
    ],
  },
  {
    date: '10/9',
    course: '하나노키 골프 클럽',
    courseMeta: 'Hananoki Golf Club',
    facts: [
      ['일정', '2026-10-09'],
      ['주소', '지도 링크 기준 위치 확인'],
      ['비고', '오전 라운드'],
    ],
    mapUrl: 'https://maps.app.goo.gl/nTBBoBwvNxQozat46?g_st=akt',
    teams: [
      { time: '10:12', members: ['종혁', '성호', '병화'] },
      { time: '10:20', members: ['경환', '상회', '원일', '성문'] },
    ],
  },
]

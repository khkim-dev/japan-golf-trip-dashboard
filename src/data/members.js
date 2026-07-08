const imagePath = (fileName) => `${import.meta.env.BASE_URL}images/profiles/${fileName}`

export const members = [
  {
    id: 'gyeonghwan',
    name: '경환',
    nickname: 'Dashboard Maker',
    role: '축구황제',
    image: imagePath('gyeonghwan.png'),
  },
  {
    id: 'byeonghwa',
    name: '병화',
    nickname: 'Local Guide',
    role: '지역전문가',
    image: imagePath('byeonghwa.png'),
  },
  {
    id: 'sanghoe',
    name: '상회',
    nickname: 'Fact-Bing Boss',
    role: '사실빙 사장',
    image: imagePath('sanghoe.png'),
  },
  {
    id: 'seongmun',
    name: '성문',
    nickname: 'Road Captain',
    role: '운전기사',
    image: imagePath('seongmun.png'),
  },
  {
    id: 'seongho',
    name: '성호',
    nickname: 'Landlord Mode',
    role: '건물주',
    image: imagePath('seongho.png'),
  },
  {
    id: 'wonil',
    name: '원일',
    nickname: 'General Manager',
    role: '총괄 책임자',
    image: imagePath('wonil.png'),
  },
  {
    id: 'jonghyeok',
    name: '종혁',
    nickname: 'Golden Rookie',
    role: '금쪽이',
    image: imagePath('jonghyeok.png'),
  },
]

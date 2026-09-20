import { useState } from 'react'
import './App.css'
import { TripInfographic } from './components/TripInfographic'
import { YardageBook } from './components/YardageBook'
import { accommodations, golfRounds, infographicDays, travelerTimeline } from './data/schedule'
import { yardageCourses } from './data/yardageBook'

const tripStartDate = new Date('2026-10-06T00:00:00+09:00')
const sectionOrder = ['overview', 'bookings', 'yardage']

const sections = [
  {
    id: 'overview',
    label: 'Overview',
    title: 'Trip Overview',
    description: '여행의 핵심 정보를 이미지형 인포그래픽 보드로 먼저 확인합니다.',
  },
  {
    id: 'yardage',
    label: 'Yardage',
    title: 'Yardage Book',
    description: '캐디 없는 라운드를 위한 모바일 홀별 코스북입니다.',
  },
  {
    id: 'bookings',
    label: 'Booking',
    title: 'Booking Summary',
    description: '숙소와 골프장 예약 현황을 확인합니다.',
  },
]

function getCountdownDays() {
  const today = new Date()
  const millisecondsPerDay = 1000 * 60 * 60 * 24
  const difference = tripStartDate - today

  return Math.max(0, Math.ceil(difference / millisecondsPerDay))
}

function App() {
  const [activeSectionId, setActiveSectionId] = useState('overview')
  const countdownDays = getCountdownDays()
  const activeSection = sections.find((section) => section.id === activeSectionId)
  const orderedSections = sectionOrder.map((sectionId) => sections.find((section) => section.id === sectionId))

  return (
    <main className="app">
      <div className="dashboard-shell">
        <section className="landing" aria-labelledby="project-title">
          <div className="hero-copy">
            <p className="eyebrow">Fairway Travel Command Board</p>
            <h1 id="project-title">FAIRWAY</h1>
            <p className="trip-period">
              <strong>Japan Golf Tour 2026</strong>
              <span>October 6–10, 2026</span>
            </p>
          </div>

          <div className="countdown-panel" aria-label="Trip countdown">
            <span className="countdown-label">Countdown</span>
            <strong>D-{countdownDays}</strong>
          </div>
        </section>

        <nav className="mobile-tabs" aria-label="Dashboard sections">
          {orderedSections.map((section) => (
            <button
              key={section.id}
              type="button"
              className={section.id === activeSectionId ? 'active' : ''}
              onClick={() => setActiveSectionId(section.id)}
            >
              {section.label}
            </button>
          ))}
        </nav>

        <section className="content-panel" aria-live="polite">
          {activeSectionId === 'overview' ? (
            <>
              <h2>{activeSection.title}</h2>
              <TripInfographic
                accommodations={accommodations}
                days={infographicDays}
                golfRounds={golfRounds}
                travelerTimeline={travelerTimeline}
              />
            </>
          ) : activeSectionId === 'yardage' ? (
            <>
              <h2>{activeSection.title}</h2>
              <YardageBook courses={yardageCourses} />
            </>
          ) : activeSectionId === 'bookings' ? (
            <>
              <h2>{activeSection.title}</h2>
              <div className="booking-grid">
                {accommodations.map((stay) => (
                  <article className="booking-card" key={`${stay.date}-${stay.title}`}>
                    <div className={`booking-card-image ${stay.visualType}`} aria-hidden="true" />
                    <span>Stay · {stay.date}</span>
                    <h3>{stay.title}</h3>
                    <p>{stay.subtitle}</p>
                    <dl className="booking-facts">
                      {stay.facts.map(([label, value]) => (
                        <div key={`${stay.title}-${label}`}>
                          <dt>{label}</dt>
                          <dd>{value}</dd>
                        </div>
                      ))}
                    </dl>
                    <a className="map-link" href={stay.mapUrl} target="_blank" rel="noreferrer">
                      지도 보기
                    </a>
                  </article>
                ))}
                {golfRounds.map((round) => (
                  <article className="booking-card golf-card" key={`${round.date}-${round.course}`}>
                    <div className={`booking-card-image ${round.visualType}`} aria-hidden="true" />
                    <span>Golf · {round.date}</span>
                    <h3>{round.course}</h3>
                    <p>{round.courseMeta}</p>
                    <dl className="booking-facts">
                      {round.facts.map(([label, value]) => (
                        <div key={`${round.course}-${label}`}>
                          <dt>{label}</dt>
                          <dd>{value}</dd>
                        </div>
                      ))}
                    </dl>
                    <a className="map-link" href={round.mapUrl} target="_blank" rel="noreferrer">
                      지도 보기
                    </a>
                    <div className="tee-list">
                      {round.teams.map((team) => (
                        <div className="tee-row" key={`${round.date}-${team.time}`}>
                          <strong>{team.time}</strong>
                          <p>{team.members.join(' · ')}</p>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2>{activeSection.title}</h2>
              <p>{activeSection.description}</p>
            </>
          )}
        </section>
      </div>
    </main>
  )
}

export default App

import { useState } from 'react'
import './App.css'
import { MemberCard } from './components/MemberCard'
import { ExpenseEntry } from './components/ExpenseEntry'
import { ScheduleBoard } from './components/ScheduleBoard'
import { members } from './data/members'
import { accommodations, golfRounds, tripSchedule } from './data/schedule'

const tripStartDate = new Date('2026-10-06T00:00:00+09:00')

const sections = [
  {
    id: 'members',
    label: 'Members',
    title: '7 Friends',
    description: '이번 여행을 함께하는 멤버입니다.',
  },
  {
    id: 'schedule',
    label: 'Schedule',
    title: 'Trip Planner',
    description: '2026년 10월 6일부터 10일까지의 날짜별 일정입니다.',
  },
  {
    id: 'bookings',
    label: 'Booking',
    title: 'Booking Summary',
    description: '숙소, 골프장, 항공 예약 현황을 요약합니다.',
  },
  {
    id: 'balance',
    label: 'Balance',
    title: 'Fairway Balance Board',
    description: '여행 지출을 입력하고 분담 멤버를 선택합니다.',
  },
]

function getCountdownDays() {
  const today = new Date()
  const millisecondsPerDay = 1000 * 60 * 60 * 24
  const difference = tripStartDate - today

  return Math.max(0, Math.ceil(difference / millisecondsPerDay))
}

function App() {
  const [activeSectionId, setActiveSectionId] = useState('members')
  const [expenseForm, setExpenseForm] = useState({
    title: '',
    payerId: members[0].id,
    amount: '',
    sharedMemberIds: members.map((member) => member.id),
  })
  const [expenses, setExpenses] = useState([])
  const countdownDays = getCountdownDays()
  const activeSection = sections.find((section) => section.id === activeSectionId)
  function handleExpenseChange(event) {
    const { name, value } = event.target

    setExpenseForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }))
  }

  function handleSharedMemberToggle(memberId) {
    setExpenseForm((currentForm) => {
      const isSelected = currentForm.sharedMemberIds.includes(memberId)
      const sharedMemberIds = isSelected
        ? currentForm.sharedMemberIds.filter((id) => id !== memberId)
        : [...currentForm.sharedMemberIds, memberId]

      return {
        ...currentForm,
        sharedMemberIds,
      }
    })
  }

  function handleExpenseSubmit(event) {
    event.preventDefault()

    const amount = Number(expenseForm.amount)
    if (!expenseForm.title.trim() || amount <= 0) {
      return
    }

    const payer = members.find((member) => member.id === expenseForm.payerId)
    const sharedMembers = members.filter((member) =>
      expenseForm.sharedMemberIds.includes(member.id),
    )

    if (sharedMembers.length === 0) {
      return
    }

    const expense = {
      id: crypto.randomUUID(),
      title: expenseForm.title.trim(),
      payerName: payer.name,
      amount,
      sharedMemberNames: sharedMembers.map((member) => member.name),
      splitAmount: Math.round(amount / sharedMembers.length),
    }

    setExpenses((currentExpenses) => [expense, ...currentExpenses])
    setExpenseForm((currentForm) => ({
      ...currentForm,
      title: '',
      amount: '',
    }))
  }

  return (
    <main className="app">
      <div className="dashboard-shell">
        <section className="landing" aria-labelledby="project-title">
          <div className="hero-copy">
            <p className="eyebrow">Fairway Travel Command Board</p>
            <h1 id="project-title">Japan Golf Trip 2026</h1>
            <p className="trip-period">Nagoya · October 6 - October 10</p>
          </div>

          <div className="countdown-panel" aria-label="Trip countdown">
            <span className="countdown-label">Countdown</span>
            <strong>D-{countdownDays}</strong>
          </div>
        </section>

        <nav className="mobile-tabs" aria-label="Dashboard sections">
          {sections.map((section) => (
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
          <p className="panel-kicker">Mission 8 Section</p>
          {activeSectionId === 'members' ? (
            <>
              <h2>{activeSection.title}</h2>
              <p>{activeSection.description}</p>
              <div className="profile-grid">
                {members.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </>
          ) : activeSectionId === 'schedule' ? (
            <>
              <h2>{activeSection.title}</h2>
              <p>{activeSection.description}</p>
              <ScheduleBoard schedule={tripSchedule} />
            </>
          ) : activeSectionId === 'bookings' ? (
            <>
              <h2>{activeSection.title}</h2>
              <p>{activeSection.description}</p>
              <div className="booking-grid">
                {accommodations.map((stay) => (
                  <article className="booking-card" key={`${stay.date}-${stay.title}`}>
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
                <article className="booking-card">
                  <span>Flight</span>
                  <h3>Member Flight Board</h3>
                  <p>출국/입국 항공편은 Schedule 탭 상단에서 확인합니다.</p>
                </article>
              </div>
            </>
          ) : activeSectionId === 'balance' ? (
            <>
              <h2>{activeSection.title}</h2>
              <p>{activeSection.description}</p>
              <ExpenseEntry
                expenseForm={expenseForm}
                expenses={expenses}
                members={members}
                onExpenseChange={handleExpenseChange}
                onSharedMemberToggle={handleSharedMemberToggle}
                onSubmit={handleExpenseSubmit}
              />
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

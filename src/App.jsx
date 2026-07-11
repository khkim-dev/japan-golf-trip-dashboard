import { useEffect, useRef, useState } from 'react'
import './App.css'
import { ExpenseEntry } from './components/ExpenseEntry'
import { MemberCard } from './components/MemberCard'
import { TripInfographic } from './components/TripInfographic'
import { YardageBook } from './components/YardageBook'
import { members } from './data/members'
import { accommodations, golfRounds, infographicDays, memberTimeline } from './data/schedule'
import { yardageCourses } from './data/yardageBook'
import { isSupabaseConfigured } from './lib/supabase'
import {
  createExpense,
  deleteExpense,
  fetchExpenses,
  subscribeToExpenseChanges,
} from './services/expenses'

const tripStartDate = new Date('2026-10-06T00:00:00+09:00')
const sectionOrder = ['overview', 'members', 'bookings', 'yardage', 'balance']

const sections = [
  {
    id: 'overview',
    label: 'Overview',
    title: 'Trip Overview',
    description: '여행의 핵심 정보를 이미지형 인포그래픽 보드로 먼저 확인합니다.',
  },
  {
    id: 'members',
    label: 'Members',
    title: '7 Friends',
    description: '이번 여행을 함께하는 멤버입니다.',
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
  {
    id: 'balance',
    label: 'Balance',
    title: 'Fairway Balance',
    description: 'Every Round Ends Fairly.',
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
  const [expenseForm, setExpenseForm] = useState({
    title: '',
    payerId: members[0].id,
    amount: '',
    sharedMemberIds: members.map((member) => member.id),
  })
  const [expenses, setExpenses] = useState([])
  const [expenseError, setExpenseError] = useState('')
  const [isExpenseLoading, setIsExpenseLoading] = useState(false)
  const [isExpenseSaving, setIsExpenseSaving] = useState(false)
  const [realtimeStatus, setRealtimeStatus] = useState('CONNECTING')
  const expenseSyncRef = useRef(null)
  const countdownDays = getCountdownDays()
  const activeSection = sections.find((section) => section.id === activeSectionId)
  const orderedSections = sectionOrder.map((sectionId) => sections.find((section) => section.id === sectionId))

  useEffect(() => {
    let isMounted = true

    async function loadExpenses() {
      if (!isSupabaseConfigured) {
        setExpenseError('Supabase 환경변수가 설정되지 않았습니다.')
        return
      }

      setIsExpenseLoading(true)
      setExpenseError('')

      try {
        const savedExpenses = await fetchExpenses()
        if (isMounted) {
          setExpenses(savedExpenses)
        }
      } catch (error) {
        if (isMounted) {
          setExpenseError(error.message)
        }
      } finally {
        if (isMounted) {
          setIsExpenseLoading(false)
        }
      }
    }

    loadExpenses()

    const expenseSync = isSupabaseConfigured
      ? subscribeToExpenseChanges({
        onDelete: (expenseId) => {
          setExpenses((currentExpenses) =>
            currentExpenses.filter((expense) => expense.id !== expenseId),
          )
        },
        onInsert: (expense) => {
          setExpenses((currentExpenses) => {
            const alreadyExists = currentExpenses.some((currentExpense) => currentExpense.id === expense.id)
            if (alreadyExists) return currentExpenses

            return [expense, ...currentExpenses]
          })
        },
        onStatus: setRealtimeStatus,
      })
      : undefined
    expenseSyncRef.current = expenseSync

    return () => {
      isMounted = false
      expenseSync?.unsubscribe()
      expenseSyncRef.current = null
    }
  }, [])

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

  async function handleExpenseSubmit(event) {
    event.preventDefault()

    const amount = Number(expenseForm.amount)
    if (!isSupabaseConfigured || !expenseForm.title.trim() || amount <= 0) {
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
      title: expenseForm.title.trim(),
      payerId: payer.id,
      payerName: payer.name,
      amount,
      sharedMemberIds: sharedMembers.map((member) => member.id),
      sharedMemberNames: sharedMembers.map((member) => member.name),
      splitAmount: Math.round(amount / sharedMembers.length),
    }

    setIsExpenseSaving(true)
    setExpenseError('')

    try {
      const savedExpense = await createExpense(expense)
      setExpenses((currentExpenses) => {
        const alreadyExists = currentExpenses.some((currentExpense) => currentExpense.id === savedExpense.id)
        if (alreadyExists) return currentExpenses

        return [savedExpense, ...currentExpenses]
      })
      setExpenseForm((currentForm) => ({
        ...currentForm,
        title: '',
        amount: '',
      }))
      expenseSyncRef.current?.broadcastInsert(savedExpense)
    } catch (error) {
      setExpenseError(error.message)
    } finally {
      setIsExpenseSaving(false)
    }
  }

  async function handleExpenseDelete(expenseId) {
    if (!isSupabaseConfigured) {
      return
    }

    setExpenseError('')

    try {
      await deleteExpense(expenseId)
      setExpenses((currentExpenses) =>
        currentExpenses.filter((expense) => expense.id !== expenseId),
      )
      expenseSyncRef.current?.broadcastDelete(expenseId)
    } catch (error) {
      setExpenseError(error.message)
    }
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
              <p>{activeSection.description}</p>
              <TripInfographic
                accommodations={accommodations}
                days={infographicDays}
                golfRounds={golfRounds}
                memberTimeline={memberTimeline}
              />
            </>
          ) : activeSectionId === 'members' ? (
            <>
              <h2>{activeSection.title}</h2>
              <p>{activeSection.description}</p>
              <div className="profile-grid">
                {members.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            </>
          ) : activeSectionId === 'yardage' ? (
            <>
              <h2>{activeSection.title}</h2>
              <p>{activeSection.description}</p>
              <YardageBook courses={yardageCourses} />
            </>
          ) : activeSectionId === 'bookings' ? (
            <>
              <h2>{activeSection.title}</h2>
              <p>{activeSection.description}</p>
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
          ) : activeSectionId === 'balance' ? (
            <>
              <h2>{activeSection.title}</h2>
              <p>{activeSection.description}</p>
              <ExpenseEntry
                expenseForm={expenseForm}
                errorMessage={expenseError}
                expenses={expenses}
                isLoading={isExpenseLoading}
                isSaving={isExpenseSaving}
                members={members}
                onExpenseChange={handleExpenseChange}
                onExpenseDelete={handleExpenseDelete}
                onSharedMemberToggle={handleSharedMemberToggle}
                onSubmit={handleExpenseSubmit}
                realtimeStatus={realtimeStatus}
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

const eventLabels = {
  air: '항공',
  stay: '숙소',
  food: '식사',
  golf: '골프',
  map: '관광',
  car: '이동',
}

export function TripInfographic({ accommodations, days, golfRounds, memberTimeline }) {
  const outboundGroups = [
    { time: '10/6 17:30 → 18:55', members: ['원일', '병화', '상회'] },
    { time: '10/6 17:40 → 19:30', members: ['성호'] },
    { time: '10/7 08:30 → 10:00', members: ['성문'] },
    { time: '10/7 17:40 → 19:30', members: ['경환', '종혁'] },
  ]
  const inboundGroups = [
    { time: '10/10 19:55 → 21:30', members: ['원일', '병화', '상회', '성문'] },
    { time: '10/10 20:30 → 22:15', members: ['성호', '경환', '종혁'] },
  ]

  return (
    <div className="overview-board">
      <section className="overview-stats" aria-label="Trip summary">
        <div>
          <span>Period</span>
          <strong>10/6 - 10/10</strong>
        </div>
        <div>
          <span>Members</span>
          <strong>{memberTimeline.length} Friends</strong>
        </div>
        <div>
          <span>Rounds</span>
          <strong>{golfRounds.length} Golf</strong>
        </div>
      </section>

      <section className="visual-board flight-visual-board" aria-labelledby="flight-board-title">
        <div className="visual-board-heading">
          <span>Flight Board</span>
          <h4 id="flight-board-title">한국 ↔ 나고야 항공 일정</h4>
        </div>
        <div className="flight-columns">
          <FlightGroup title="출국" route="Korea → Nagoya" groups={outboundGroups} />
          <FlightGroup title="입국" route="Nagoya → Korea" groups={inboundGroups} />
        </div>
      </section>

      <section className="visual-board compact-route-board" aria-labelledby="route-board-title">
        <div className="visual-board-heading">
          <span>Trip Route</span>
          <h4 id="route-board-title">5일 일정 한눈에 보기</h4>
        </div>
        <div className="compact-days">
          {days.map((day) => (
            <article className="compact-day" key={day.date}>
              <div className="compact-day-pin">
                <strong>{day.date}</strong>
                <span>{day.day}</span>
              </div>
              <div className="compact-day-copy">
                <h5>{day.title}</h5>
                <p>{day.summary}</p>
                <div className="compact-event-row">
                  {day.events.slice(0, 4).map((event) => (
                    <span className={event.type} key={`${day.date}-${event.time}-${event.title}`}>
                      {eventLabels[event.type]}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="visual-board preview-booking-board" aria-labelledby="preview-booking-title">
        <div className="visual-board-heading">
          <span>Booking Preview</span>
          <h4 id="preview-booking-title">숙소와 골프 예약 요약</h4>
        </div>
        <div className="preview-booking-grid">
          {accommodations.map((stay) => (
            <PreviewCard
              key={`${stay.date}-${stay.title}`}
              label={`Stay · ${stay.date}`}
              title={stay.title}
              subtitle={stay.facts[0][1]}
              visualType={stay.visualType}
            />
          ))}
          {golfRounds.map((round) => (
            <PreviewCard
              key={`${round.date}-${round.course}`}
              label={`Golf · ${round.date}`}
              title={round.course}
              subtitle={round.teams.map((team) => team.time).join(' / ')}
              visualType={round.visualType}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

function FlightGroup({ groups, route, title }) {
  return (
    <div className="flight-group-card">
      <div>
        <span>{route}</span>
        <strong>{title}</strong>
      </div>
      {groups.map((group) => (
        <div className="flight-group-row" key={`${title}-${group.time}`}>
          <b>{group.time}</b>
          <p>{group.members.join(' · ')}</p>
        </div>
      ))}
    </div>
  )
}

function PreviewCard({ label, subtitle, title, visualType }) {
  return (
    <article className="preview-card">
      <div className={`preview-card-image ${visualType}`} aria-hidden="true" />
      <div>
        <span>{label}</span>
        <h5>{title}</h5>
        <p>{subtitle}</p>
      </div>
    </article>
  )
}

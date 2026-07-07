import { memberTimeline } from '../data/schedule'

export function ScheduleBoard({ schedule }) {
  return (
    <div className="schedule-board">
      <section className="timeline-card" aria-labelledby="timeline-title">
        <div className="timeline-heading">
          <div>
            <span>Flight Chart</span>
            <h3 id="timeline-title">출국 / 입국 시간표</h3>
          </div>
          <p>한국 ↔ 나고야</p>
        </div>

        <div className="flight-chart" aria-label="Member flight chart">
          <div className="flight-chart-head">Name</div>
          <div className="flight-chart-head">
            <strong>출국</strong>
            <span>한국 출발 → 나고야 도착</span>
          </div>
          <div className="flight-chart-head">
            <strong>입국</strong>
            <span>나고야 출발 → 한국 도착</span>
          </div>

          {memberTimeline.map((row) => (
            <div className="flight-chart-row" key={row.member}>
              <strong>{row.member}</strong>
              <div className={`flight-cell flight-route outbound ${row.tone}`}>
                <span>{row.outboundDate}</span>
                <b>{row.outboundDepart} → {row.arrivalTime}</b>
              </div>
              <div className="flight-cell flight-route inbound">
                <span>{row.returnDate}</span>
                <b>{row.returnDepart} → {row.returnArrive}</b>
              </div>
            </div>
          ))}
        </div>
      </section>

      {schedule.map((day) => (
        <article className="schedule-card" key={day.date}>
          <div className="schedule-date">
            <span>{day.label}</span>
            <strong>{day.title}</strong>
          </div>
          <ul>
            {day.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="schedule-tags">
            {day.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="day-blocks">
            {day.blocks.map((block) => (
              <div className="day-block" key={`${day.date}-${block.time}-${block.title}`}>
                <span>{block.time}</span>
                <p>{block.title}</p>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}

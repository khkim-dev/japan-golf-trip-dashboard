const eventLabels = {
  air: '항공',
  car: '이동',
  food: '식사',
  golf: '골프',
  map: '관광',
  stay: '숙소',
}

export function RouteInfographic({ days }) {
  return (
    <section className="route-infographic" aria-label="Trip route infographic">
      <div className="route-infographic-heading">
        <span>Route Board</span>
        <h3>5 Days in Nagoya</h3>
        <p>항공, 숙소, 골프, 관광의 흐름을 한눈에 확인합니다.</p>
      </div>

      <div className="route-map-line">
        {days.map((day) => (
          <article className="route-stop" key={day.date}>
            <div className="route-stop-pin">
              <strong>{day.date}</strong>
              <span>{day.day}</span>
            </div>
            <div className="route-stop-card">
              <h4>{day.title}</h4>
              <p>{day.summary}</p>
              <div className="route-stop-events">
                {day.events.slice(0, 5).map((event) => (
                  <div className={`route-mini-event ${event.type}`} key={`${day.date}-${event.time}-${event.title}`}>
                    <span>{eventLabels[event.type]}</span>
                    <strong>{event.time}</strong>
                    <p>{event.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

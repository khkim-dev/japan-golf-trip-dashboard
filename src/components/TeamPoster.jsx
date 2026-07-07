export function TeamPoster({ members }) {
  const [leader, ...crew] = members

  return (
    <section className="team-poster" aria-label="Team member poster">
      <div className="team-poster-hero">
        <span>Team Roster</span>
        <h3>7 Friends</h3>
        <p>나고야 골프 여행을 함께 준비하는 멤버 보드</p>
      </div>

      <div className="team-poster-board">
        <article className="team-poster-card featured" key={leader.id}>
          <img src={leader.image} alt={`${leader.name} profile`} />
          <div>
            <span>Trip Board</span>
            <strong>{leader.name}</strong>
            <p>{leader.role}</p>
          </div>
        </article>

        <div className="team-poster-grid">
          {crew.map((member) => (
            <article className="team-poster-card" key={member.id}>
              <img src={member.image} alt={`${member.name} profile`} />
              <div>
                <strong>{member.name}</strong>
                <p>{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
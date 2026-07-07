export function MemberCard({ member }) {
  return (
    <article className="profile-card">
      <img src={member.image} alt={`${member.name} profile`} />
      <div className="profile-copy">
        <h3>{member.name}</h3>
        <span>{member.role}</span>
      </div>
    </article>
  )
}

export function ExpenseEntry({
  expenseForm,
  expenses,
  members,
  onExpenseChange,
  onSharedMemberToggle,
  onSubmit,
}) {
  const selectedMembers = members.filter((member) =>
    expenseForm.sharedMemberIds.includes(member.id),
  )
  const amount = Number(expenseForm.amount) || 0
  const splitAmount =
    selectedMembers.length > 0 ? Math.round(amount / selectedMembers.length) : 0

  return (
    <div className="expense-board">
      <form className="expense-form" onSubmit={onSubmit}>
        <label>
          지출 내용
          <input
            name="title"
            placeholder="예: 첫날 저녁 식사"
            type="text"
            value={expenseForm.title}
            onChange={onExpenseChange}
          />
        </label>

        <label>
          지출자
          <select
            name="payerId"
            value={expenseForm.payerId}
            onChange={onExpenseChange}
          >
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          금액
          <input
            min="0"
            name="amount"
            placeholder="예: 120000"
            type="number"
            value={expenseForm.amount}
            onChange={onExpenseChange}
          />
        </label>

        <fieldset>
          <legend>분담 멤버</legend>
          <div className="share-member-grid">
            {members.map((member) => (
              <label key={member.id}>
                <input
                  checked={expenseForm.sharedMemberIds.includes(member.id)}
                  type="checkbox"
                  onChange={() => onSharedMemberToggle(member.id)}
                />
                {member.name}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="split-preview">
          <span>1인 예상 부담금</span>
          <strong>{splitAmount.toLocaleString()}원</strong>
        </div>

        <button type="submit">Add Expense</button>
      </form>

      <section className="expense-list" aria-labelledby="expense-list-title">
        <div className="timeline-heading">
          <div>
            <span>Fairway Balance</span>
            <h3 id="expense-list-title">Expense List</h3>
          </div>
          <p>{expenses.length} items</p>
        </div>

        {expenses.length === 0 ? (
          <p className="empty-state">아직 입력된 지출 항목이 없습니다.</p>
        ) : (
          expenses.map((expense) => (
            <article className="expense-item" key={expense.id}>
              <div>
                <strong>{expense.title}</strong>
                <span>{expense.payerName} 결제</span>
              </div>
              <p>{expense.amount.toLocaleString()}원</p>
              <small>
                {expense.sharedMemberNames.join(', ')} · 1인{' '}
                {expense.splitAmount.toLocaleString()}원
              </small>
            </article>
          ))
        )}
      </section>
    </div>
  )
}

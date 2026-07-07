import {
  calculateBalanceStats,
  calculateBalanceSummary,
  calculateSettlementTransfers,
} from '../utils/settlement'

function formatYen(amount) {
  return `¥${Math.abs(amount).toLocaleString()}`
}

function getBalanceClass(balance) {
  if (balance > 0) return 'positive'
  if (balance < 0) return 'negative'
  return 'settled'
}

export function ExpenseEntry({
  expenseForm,
  expenses,
  members,
  onExpenseChange,
  onExpenseDelete,
  onSharedMemberToggle,
  onSubmit,
}) {
  const selectedMembers = members.filter((member) =>
    expenseForm.sharedMemberIds.includes(member.id),
  )
  const amount = Number(expenseForm.amount) || 0
  const splitAmount =
    selectedMembers.length > 0 ? Math.round(amount / selectedMembers.length) : 0
  const balanceSummary = calculateBalanceSummary(expenses, members)
  const transfers = calculateSettlementTransfers(balanceSummary)
  const stats = calculateBalanceStats(expenses, members)

  return (
    <div className="nineteenth-hole">
      <section className="balance-hero" aria-labelledby="balance-title">
        <span>The 19th Hole</span>
        <h3 id="balance-title">Golf Trip Balance Center</h3>
        <p>Where every round settles fairly.</p>
      </section>

      <section className="balance-stats" aria-label="Balance statistics">
        <div>
          <span>Total Expense</span>
          <strong>{formatYen(stats.totalExpense)}</strong>
        </div>
        <div>
          <span>Transactions</span>
          <strong>{stats.transactionCount}</strong>
        </div>
        <div>
          <span>Highest Payer</span>
          <strong>{stats.highestPayer}</strong>
        </div>
        <div>
          <span>Average Cost</span>
          <strong>{formatYen(stats.averageCost)}</strong>
        </div>
      </section>

      <section className="scorecard-grid" aria-label="Member balance scorecards">
        {balanceSummary.map((member) => (
          <article className={`scorecard ${getBalanceClass(member.balance)}`} key={member.memberId}>
            <span>{member.name}</span>
            <strong>
              {member.balance > 0 ? '+' : member.balance < 0 ? '-' : ''}
              {formatYen(member.balance)}
            </strong>
            <p>{member.balance > 0 ? '받을 금액' : member.balance < 0 ? '낼 금액' : '정산 완료'}</p>
          </article>
        ))}
      </section>

      <form className="expense-form clubhouse-form" onSubmit={onSubmit}>
        <div className="form-heading">
          <span>New Transaction</span>
          <h3>라운드 비용 등록</h3>
        </div>

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

        <div className="form-row">
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
            금액 JPY
            <input
              min="0"
              name="amount"
              placeholder="예: 12000"
              type="number"
              value={expenseForm.amount}
              onChange={onExpenseChange}
            />
          </label>
        </div>

        <fieldset>
          <legend>함께 나눌 멤버</legend>
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
          <strong>{formatYen(splitAmount)}</strong>
        </div>

        <button type="submit">Add Transaction</button>
      </form>

      <section className="settlement-board" aria-labelledby="settlement-title">
        <div className="timeline-heading">
          <div>
            <span>Who Owes Who</span>
            <h3 id="settlement-title">최종 송금 제안</h3>
          </div>
          <p>{transfers.length} moves</p>
        </div>

        {transfers.length === 0 ? (
          <p className="empty-state">아직 송금할 정산 내역이 없습니다.</p>
        ) : (
          <div className="transfer-list">
            {transfers.map((transfer) => (
              <div className="transfer-item" key={`${transfer.from}-${transfer.to}-${transfer.amount}`}>
                <span>{transfer.from}</span>
                <b>→</b>
                <span>{transfer.to}</span>
                <strong>{formatYen(transfer.amount)}</strong>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="expense-list transaction-feed" aria-labelledby="expense-list-title">
        <div className="timeline-heading">
          <div>
            <span>Live Transaction Feed</span>
            <h3 id="expense-list-title">사용 내역</h3>
          </div>
          <p>{expenses.length} items</p>
        </div>

        {expenses.length === 0 ? (
          <p className="empty-state">아직 입력된 지출 항목이 없습니다.</p>
        ) : (
          <div className="receipt-scroll">
            {expenses.map((expense) => (
              <article className="expense-item" key={expense.id}>
                <div>
                  <strong>{expense.title}</strong>
                  <span>{expense.payerName} 결제</span>
                </div>
                <p>{formatYen(expense.amount)}</p>
                <small>
                  {expense.sharedMemberNames.join(' · ')} · 1인 {formatYen(expense.splitAmount)}
                </small>
                <button type="button" onClick={() => onExpenseDelete(expense.id)}>
                  Delete
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

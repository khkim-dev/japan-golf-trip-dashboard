export function calculateBalanceSummary(expenses, members) {
  const balances = members.map((member) => ({
    memberId: member.id,
    name: member.name,
    paid: 0,
    share: 0,
    balance: 0,
  }))

  const balanceById = new Map(balances.map((balance) => [balance.memberId, balance]))

  expenses.forEach((expense) => {
    const payer = balanceById.get(expense.payerId)
    const sharedMemberIds = expense.sharedMemberIds ?? []
    const splitAmount = sharedMemberIds.length > 0 ? expense.amount / sharedMemberIds.length : 0

    if (payer) {
      payer.paid += expense.amount
    }

    sharedMemberIds.forEach((memberId) => {
      const memberBalance = balanceById.get(memberId)
      if (memberBalance) {
        memberBalance.share += splitAmount
      }
    })
  })

  return balances.map((balance) => ({
    ...balance,
    balance: Math.round(balance.paid - balance.share),
  }))
}

export function calculateSettlementTransfers(balanceSummary) {
  const creditors = balanceSummary
    .filter((member) => member.balance > 0)
    .map((member) => ({ ...member }))
    .sort((a, b) => b.balance - a.balance)
  const debtors = balanceSummary
    .filter((member) => member.balance < 0)
    .map((member) => ({ ...member, balance: Math.abs(member.balance) }))
    .sort((a, b) => b.balance - a.balance)

  const transfers = []
  let creditorIndex = 0
  let debtorIndex = 0

  while (creditorIndex < creditors.length && debtorIndex < debtors.length) {
    const creditor = creditors[creditorIndex]
    const debtor = debtors[debtorIndex]
    const amount = Math.min(creditor.balance, debtor.balance)

    if (amount > 0) {
      transfers.push({
        from: debtor.name,
        to: creditor.name,
        amount: Math.round(amount),
      })
    }

    creditor.balance -= amount
    debtor.balance -= amount

    if (creditor.balance <= 0) creditorIndex += 1
    if (debtor.balance <= 0) debtorIndex += 1
  }

  return transfers
}

export function calculateBalanceStats(expenses, members) {
  const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const highestPayer = members
    .map((member) => ({
      name: member.name,
      total: expenses
        .filter((expense) => expense.payerId === member.id)
        .reduce((sum, expense) => sum + expense.amount, 0),
    }))
    .sort((a, b) => b.total - a.total)[0]
  const highestTransaction = [...expenses].sort((a, b) => b.amount - a.amount)[0]

  return {
    averageCost: members.length > 0 ? Math.round(totalExpense / members.length) : 0,
    highestPayer: highestPayer?.total > 0 ? highestPayer.name : '-',
    highestTransaction,
    totalExpense,
    transactionCount: expenses.length,
  }
}


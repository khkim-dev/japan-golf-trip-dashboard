import { supabase } from '../lib/supabase'

const EXPENSE_COLUMNS = `
  id,
  title,
  payer_id,
  payer_name,
  amount,
  shared_member_ids,
  shared_member_names,
  split_amount,
  created_at
`

function toAppExpense(row) {
  return {
    amount: row.amount,
    createdAt: row.created_at,
    id: row.id,
    payerId: row.payer_id,
    payerName: row.payer_name,
    sharedMemberIds: row.shared_member_ids ?? [],
    sharedMemberNames: row.shared_member_names ?? [],
    splitAmount: row.split_amount,
    title: row.title,
  }
}

function toDbExpense(expense) {
  return {
    amount: expense.amount,
    payer_id: expense.payerId,
    payer_name: expense.payerName,
    shared_member_ids: expense.sharedMemberIds,
    shared_member_names: expense.sharedMemberNames,
    split_amount: expense.splitAmount,
    title: expense.title,
  }
}

export async function fetchExpenses() {
  const { data, error } = await supabase
    .from('expenses')
    .select(EXPENSE_COLUMNS)
    .order('created_at', { ascending: false })

  if (error) throw error

  return data.map(toAppExpense)
}

export async function createExpense(expense) {
  const { data, error } = await supabase
    .from('expenses')
    .insert(toDbExpense(expense))
    .select(EXPENSE_COLUMNS)
    .single()

  if (error) throw error

  return toAppExpense(data)
}

export async function deleteExpense(expenseId) {
  const { error } = await supabase
    .from('expenses')
    .delete()
    .eq('id', expenseId)

  if (error) throw error
}

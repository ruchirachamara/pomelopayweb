import BackendClient from './backendClient'

export const loadTransactions = _ => BackendClient.get('transactions')
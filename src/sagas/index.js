import { takeEvery, call, put } from "redux-saga/effects"

import { loadTransactions } from "../services/transactionsService"

export default function* watcherSaga() {
  yield takeEvery("TRANSACTIONS_REQUESTED", workerSaga)
}

function* workerSaga() {
  try {
    const payload = yield call(getTransatcions)
    yield put({ type: "TRANSACTIONS_LOADED", payload })
  } catch (e) {
    yield put({ type: "TRANSACTIONS_ERRORED", payload: e })
  }
}

function getTransatcions() {
    return loadTransactions().then(response => response)
}
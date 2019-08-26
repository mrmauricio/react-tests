import { call, put } from "redux-saga/effects";
import api from "../../../services/api";
import { getTechsSuccess, getTechsFailure } from "./actions";

// teste verifica se a função está funcionando. não é teste de integração,
// que vê tudo de ponta a ponta, apenas testes unitários
export function* getTechs() {
    try {
        const response = yield call(api.get, "techs");

        yield put(getTechsSuccess(response.data));
    } catch (err) {
        yield put(getTechsFailure);
    }
}

import { runSaga } from "redux-saga";
import MockAdapter from "axios-mock-adapter";
import api from "~/services/api";

import { getTechs } from "~/store/modules/techs/sagas";
import {
    getTechsSuccess,
    getTechsFailure
} from "~/store/modules/techs/actions";

// chama o saga passando essa dispatch como parametro. mas precisa que o
// axios seja mockado para que os testes sejam aprovados, já que precisa
// fazer uma fake request a api
const apiMock = new MockAdapter(api);

describe("Techs saga", () => {
    it("should be able to fetch techs", async () => {
        const dispatch = jest.fn();

        // foi baixada a lib axios-mock-adapter para fazer um fake axios,
        // possibilitando escolher a rota buscada e qual resposta queremos
        apiMock.onGet("techs").reply(200, ["Node.js"]);

        await runSaga({ dispatch }, getTechs).toPromise();

        expect(dispatch).toHaveBeenCalledWith(getTechsSuccess(["Node.js"]));
    });

    it("should fail when api returns error", async () => {
        const dispatch = jest.fn();

        // foi baixada a lib axios-mock-adapter para fazer um fake axios,
        // possibilitando escolher a rota buscada e qual resposta queremos
        apiMock.onGet("techs").reply(500);

        await runSaga({ dispatch }, getTechs).toPromise();

        expect(dispatch).toHaveBeenCalledWith(getTechsFailure());
    });
});

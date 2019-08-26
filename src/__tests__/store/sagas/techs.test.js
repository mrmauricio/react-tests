import { runSaga } from "redux-saga";
import { getTechs } from "~/store/modules/techs/sagas";
import { getTechsSuccess } from "~/store/modules/techs/actions";

// chama o saga passando essa dispatch como parametro. mas precisa que o
// axios seja mockado para que os testes sejam aprovados, já que precisa
// fazer uma fake request a api
describe("Techs saga", () => {
    it("should be able to fetch techs", async () => {
        const dispatch = jest.fn();

        await runSaga({ dispatch }, getTechs).toPromise();

        expect(dispatch).toHaveBeenCalledWith(getTechsSuccess(["Node.js"]));
    });
});

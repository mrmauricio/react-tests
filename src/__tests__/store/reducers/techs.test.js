import reducer, { INITIAL_STATE } from "~/store/modules/techs/reducer";
import * as TechsActions from "~/store/modules/techs/actions";

describe("Techs reducer", () => {
    it("ADD_TECH", () => {
        // chama o reducer em questão passando o initial_state e a action
        // por parametros, então verifica se as alterações feitas estão
        // ocorrendo como o esperado
        const state = reducer(INITIAL_STATE, TechsActions.addTech("Node.js"));

        expect(state).toStrictEqual(["Node.js"]);
    });
});

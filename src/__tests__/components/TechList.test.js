import React from "react";
// esse metodo render serve pra criar uma DOM fake para que os testes possam
// ser feitos, renderiza um componente em questão nesta
// fireEvent serve para disparar eventos do js
import { render, fireEvent } from "@testing-library/react";

import TechList from "~/components/TechList";

describe("TechList component", () => {
    it("should be able to add new tech", () => {
        // getByText busca um elemento pelo seu texto dentro do componente
        // getByTestId busca um elemento pela sua prop data-testid; isso é
        // usado quando nenhum dos outros metodos get se encaixa na tag buscada
        const { getByText, getByTestId, debug } = render(<TechList />);

        debug();

        fireEvent.click(getByText("Adicionar"));

        debug();

        expect(getByTestId("tech-list")).toContainElement(getByText("Node.js"));
    });
});

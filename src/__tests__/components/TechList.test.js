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
        // getByLabelText busca um elemento pelo htmlFor de sua Label
        const { getByText, getByTestId, getByLabelText, debug } = render(
            <TechList />
        );

        // no onChange no react, passamos o event.target.value como valor,
        // então é esse que devemos enviar aqui no fireEvent
        fireEvent.change(getByLabelText("Tech"), {
            target: { value: "Node.js" }
        });
        fireEvent.submit(getByTestId("tech-form"));

        expect(getByTestId("tech-list")).toContainElement(getByText("Node.js"));
        expect(getByLabelText("Tech")).toHaveValue("");
    });
});

import React from "react";
import { useSelector } from "react-redux";
import { render } from "@testing-library/react";

import TechList from "~/components/TechList";

// a partir desse comando, toda função que for importada do react-redux não
// será mais, já que agora existe esse mock, que faz as funcionalidades fakes
jest.mock("react-redux");

describe("TechList component", () => {
    it("should render tech list", () => {
        // aqui é implementado o useSelector fake: uma função que recebe uma
        // função (cb) e então retorna um objeto de techs, com os valores em
        // questão. assim, é possível simular uma possível resposta real do
        // redux na aplicação, sem ter nenhum vínculo com o do mundo real
        useSelector.mockImplementation((cb) =>
            cb({ techs: ["Node.js", "ReactJS"] })
        );

        const { getByText, getByTestId } = render(<TechList />);

        // verifica se os valores que retornaram do fake useSelector foram
        // armazenados na li
        expect(getByTestId("tech-list")).toContainElement(getByText("Node.js"));
        expect(getByTestId("tech-list")).toContainElement(getByText("ReactJS"));
    });
});

/*
// first modules:

import React from "react";
// esse metodo render serve pra criar uma DOM fake para que os testes possam
// ser feitos, renderiza um componente em questão nesta
// fireEvent serve para disparar eventos do js
// o método cleanup limpa toda a DOM fake que foi gerada
import { render, fireEvent, cleanup } from "@testing-library/react";

import TechList from "~/components/TechList";

describe("TechList component", () => {
    // limpa o mock do localstorage (um fake localStorage, que simula o real)
    // antes de fazer cada teste
    beforeEach(() => {
        localStorage.clear();
    });

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

    it("should store techs in storage", () => {
        let { getByText, getByTestId, getByLabelText } = render(<TechList />);

        fireEvent.change(getByLabelText("Tech"), {
            target: { value: "Node.js" }
        });
        fireEvent.submit(getByTestId("tech-form"));

        // limpa a fake DOM
        cleanup();

        // reconstrói a fake DOM e redefine as variáveis
        ({ getByText, getByTestId, getByLabelText } = render(<TechList />));

        expect(localStorage.setItem).toHaveBeenCalledWith(
            "techs",
            JSON.stringify(["Node.js"])
        );
        expect(getByTestId("tech-list")).toContainElement(getByText("Node.js"));
    });
});

*/

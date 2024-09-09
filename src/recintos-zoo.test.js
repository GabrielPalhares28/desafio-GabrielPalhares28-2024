import { RecintosZoo } from "./recintos-zoo.js";

describe('Recintos do Zoologico', () => {
    
    test('Deve encontrar recinto para 1 hipopótamo em recinto misto', () => {
        const resultado = new RecintosZoo().analisaRecintos('HIPOPOTAMO', 1);
        expect(resultado).not.toBe('Não há recinto viável');
        expect(resultado).not.toBe('Animal inválido');
        expect(resultado).not.toBe('Quantidade inválida');
        expect(resultado[0]).toBe('Recinto nro 3 (espaço livre: 2 total: 7)');
    });

    test('Deve rejeitar animal inválido', () => {
        const resultado = new RecintosZoo().analisaRecintos('UNICORNIO', 1);
        expect(resultado).toBe("Animal inválido");
    });

    test('Deve rejeitar quantidade inválida', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 0);
        expect(resultado).toBe("Quantidade inválida");
    });

    test('Não deve encontrar recintos para 10 macacos', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 10);
        expect(resultado).toBe("Não há recinto viável");
    });

    test('Deve encontrar recinto para 1 crocodilo', () => {
        const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 1);
        expect(resultado).not.toBe('Não há recinto viável');
        expect(resultado[0]).toBe('Recinto nro 4 (espaço livre: 5 total: 8)');
        expect(resultado.length).toBe(1);
    });

    test('Deve encontrar recintos para 2 macacos', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 2);
        expect(resultado).not.toBe('Não há recinto viável');
        expect(resultado[0]).toBe('Recinto nro 1 (espaço livre: 5 total: 10)');
        expect(resultado[1]).toBe('Recinto nro 2 (espaço livre: 3 total: 5)');
        expect(resultado[2]).toBe('Recinto nro 3 (espaço livre: 2 total: 7)');
        expect(resultado.length).toBe(3);
    });

});



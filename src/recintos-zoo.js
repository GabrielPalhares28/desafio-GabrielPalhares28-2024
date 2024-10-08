class RecintosZoo {

  analisaRecintos(animal, quantidade) {
     
      const recintos = [
          { numero: 1, bioma: ['savana'], tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
          { numero: 2, bioma: ['floresta'], tamanhoTotal: 5, animais: [] },
          { numero: 3, bioma: ['savana', 'rio'], tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
          { numero: 4, bioma: ['rio'], tamanhoTotal: 8, animais: [] },
          { numero: 5, bioma: ['savana'], tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
      ];

  
      const animaisPermitidos = {
          LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
          LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
          CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
          MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
          GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
          HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
      };

      
      function validadeSpecieAndQuantity(especie, quantidade) {
          if (typeof quantidade !== 'number' || quantidade <= 0 || !Number.isInteger(quantidade)) {
              return 'Quantidade inválida';
          }

          if (!animaisPermitidos[especie]) {
              return 'Animal inválido';
          }

          return null; 
      }

      
      function encontrarRecinto(especie, quantidade) {
         
          const erro = validadeSpecieAndQuantity(especie, quantidade);
          if (erro) {
              return { erro, recintosViaveis: [] };
          }

          const animalInfo = animaisPermitidos[especie];
          const tamanhoAnimal = animalInfo.tamanho * quantidade;
          let recintosViaveis = [];

          for (const recinto of recintos) {
              const espacoOcupado = calcularEspacoOcupado(recinto.animais);
              const espacoLivre = recinto.tamanhoTotal - espacoOcupado;

              const biomaValido = recinto.bioma.some(bioma => animalInfo.biomas.includes(bioma));
              const espacoSuficiente = espacoLivre >= tamanhoAnimal + (recinto.animais.length > 0 ? 1 : 0); // 
              const compativel = verificarCompatibilidade(recinto, especie, animalInfo);

              if (biomaValido && espacoSuficiente && compativel) {
                  recintosViaveis.push(`Recinto nro ${recinto.numero} (espaço livre: ${espacoLivre - tamanhoAnimal} total: ${recinto.tamanhoTotal})`);
              }
          }

          if (recintosViaveis.length === 0) {
              return { erro: 'Não há recinto viável', recintosViaveis: [] };
          }

          return { erro: null, recintosViaveis: recintosViaveis.sort((a, b) => parseInt(a.split(' ')[2]) - parseInt(b.split(' ')[2])) };
      }

      
      function calcularEspacoOcupado(animaisExistentes) {
          return animaisExistentes.reduce((total, animal) => {
              const tamanhoAnimal = animaisPermitidos[animal.especie].tamanho;
              return total + (tamanhoAnimal * animal.quantidade);
          }, 0);
      }

     
      function verificarCompatibilidade(recinto, especie, animalInfo) {
          const animaisExistentes = recinto.animais;
          const carnivorosNoRecinto = animaisExistentes.some(animal => animaisPermitidos[animal.especie].carnivoro);

         
          if (animalInfo.carnivoro && animaisExistentes.length > 0) {
              return animaisExistentes.every(animal => animal.especie === especie);
          }

         
          if (especie === 'HIPOPOTAMO') {
              return recinto.bioma.includes('savana') && recinto.bioma.includes('rio');
          }

         
          if (especie === 'MACACO' && animaisExistentes.length === 0) {
              return false;
          }

         
          if (animaisExistentes.length > 0 && !carnivorosNoRecinto) {
              return true;
          }

          return true;
      }

  }
}

export { RecintosZoo as RecintosZoo };


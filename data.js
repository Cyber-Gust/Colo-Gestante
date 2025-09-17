const COLO_DATA = {
  gestante: {
    nome: 'Maria Eduarda',
    semana: 24,
    dia: 3,
    avatar: 'assets/duda_avatar.png',
    dpp: "2025-12-10",
  },
  consultas: [
    { tipo: "pré-natal", data: "2025-09-19T14:00:00", local: "UBS Central — Sala 3" },
    { tipo: "ultrassom", data: "2025-09-25T09:30:00", local: "Clínica Imagem — Sala 2" },
    { tipo: "vacina", data: "2025-10-02T10:00:00", local: "UBS Central — Sala de Vacina" },
    { tipo: "puericultura", data: "2025-10-15T13:30:00", local: "UBS Central — Sala 1" },
    { tipo: "exame", data: "2025-10-20T08:00:00", local: "Laboratório Vida" }
  ],
  alertas: [
    'Dor de cabeça intensa ou visão turva',
    'Sangramento vaginal',
    'Inchaço súbito nas mãos ou rosto',
  ],
  educacao: [
    {
      id: 'sinais-alerta-2tri',
      semana: 24,
      tag: 'Segurança',
      img: 'assets/img/hero1.jpg',
      titulo: 'Sinais de alerta no 2º trimestre',
      texto: 'Aprenda a reconhecer sinais que exigem avaliação imediata para garantir sua segurança e a do bebê.',
      textoCompleto: `O segundo trimestre é frequentemente considerado a fase mais tranquila da gestação, mas é fundamental continuar atenta aos sinais que seu corpo envia. Conhecer os sinais de alerta pode ser decisivo para uma intervenção rápida e segura.

1. Sangramento Vaginal:
Qualquer sangramento, mesmo que leve (spotting), deve ser comunicado imediatamente ao seu médico. Embora possa não ser nada grave, é crucial descartar condições como placenta prévia ou descolamento prematuro da placenta.

2. Dor Abdominal Intensa ou Cólicas Fortes:
Cólicas leves são normais devido ao crescimento do útero. No entanto, dores fortes, persistentes ou rítmicas podem indicar problemas como contrações prematuras. Não hesite em procurar avaliação médica.

3. Perda de Líquido pela Vagina:
Se você notar uma perda de líquido aquoso, em grande ou pequena quantidade, pode ser um sinal de ruptura da bolsa amniótica. Isso requer atenção médica imediata para evitar riscos de infecção.

4. Inchaço Súbito (Edema):
Um pouco de inchaço nos pés e tornozelos é comum. Contudo, um inchaço repentino e excessivo no rosto, mãos e pés, especialmente se acompanhado de dor de cabeça forte e visão turva, pode ser um sintoma de pré-eclâmpsia, uma condição grave que necessita de tratamento urgente.

5. Diminuição dos Movimentos do Bebê:
A partir da 20ª semana, você começará a sentir seu bebê se mexer mais regularmente. Se notar uma diminuição significativa ou ausência de movimentos por um período prolongado (conforme orientação do seu médico), entre em contato com a maternidade ou seu obstetra.

Lembre-se: você conhece seu corpo melhor do que ninguém. Na dúvida, é sempre melhor pecar pelo excesso de zelo. Mantenha os contatos de emergência e do seu médico sempre à mão. Cuidar de você é a melhor forma de cuidar do seu bebê.`
    },
    {
      id: 'alimentacao-hidratacao',
      semana: 24,
      tag: 'Nutrição',
      img: 'assets/img/hero2.jpg',
      titulo: 'Alimentação e hidratação',
      texto: 'Dicas de hidratação e alimentos importantes nesta fase para o desenvolvimento saudável do seu bebê.',
      textoCompleto: `Uma nutrição adequada durante a gestação é um dos pilares para o desenvolvimento saudável do seu bebê e para o seu próprio bem-estar. No segundo trimestre, as necessidades calóricas aumentam ligeiramente, e a qualidade dos alimentos que você consome faz toda a diferença.

1. A Importância da Hidratação:
Beber água é vital. A água ajuda a formar o líquido amniótico, transporta nutrientes, melhora a digestão e ajuda a prevenir infecções do trato urinário. A recomendação geral é de 2 a 3 litros por dia (cerca de 8 a 12 copos). Se você não gosta de água pura, tente águas saborizadas com frutas (limão, laranja) ou chás de ervas permitidos (consulte seu médico).

2. Nutrientes Essenciais:
- Cálcio: Fundamental para a formação dos ossos e dentes do bebê. Fontes ricas incluem leite e derivados (iogurte, queijo), vegetais de folhas escuras (espinafre, couve) e tofu.
- Ferro: Previne a anemia na mãe e garante uma boa oxigenação para o feto. Consuma carnes magras, feijão, lentilha, grão-de-bico e vegetais verde-escuros. Combine com uma fonte de vitamina C (laranja, limão) para melhorar a absorção.
- Proteínas: São os blocos de construção do corpo do bebê. Inclua fontes como carnes, peixes, ovos, leguminosas e quinoa em suas refeições.
- Ômega-3 (DHA): Essencial para o desenvolvimento do cérebro e da visão do bebê. Peixes de água fria como salmão (bem cozido) e sardinha são ótimas fontes.

3. O que Evitar:
Continue evitando alimentos crus ou malcozidos (carnes, peixes, ovos) para prevenir infecções. Reduza o consumo de cafeína, alimentos ultraprocessados, ricos em açúcar e gorduras saturadas. Evite completamente o álcool.

4. Lanches Inteligentes:
Para manter a energia e evitar picos de glicemia, faça pequenos lanches saudáveis ao longo do dia. Boas opções incluem: frutas frescas, iogurte natural com aveia, castanhas, mix de nozes ou um smoothie de frutas.

Uma alimentação equilibrada não precisa ser complicada. Priorize alimentos frescos e variados. Cada refeição é uma oportunidade de nutrir você e seu bebê.`
    },
    {
      id: 'exercicios-leves',
      semana: 24,
      tag: 'Bem-estar',
      img: 'assets/img/hero3.jpg',
      titulo: 'Exercícios leves',
      texto: 'Caminhadas e alongamentos para melhorar o conforto, a disposição e preparar seu corpo para o parto.',
      textoCompleto: `Manter-se ativa durante a gestação traz inúmeros benefícios, desde a melhora do humor e do sono até a redução de dores e o fortalecimento do corpo para o parto. No segundo trimestre, com a energia geralmente em alta, é um ótimo momento para criar uma rotina de exercícios leves e seguros.

Importante: Antes de iniciar qualquer atividade física, converse com seu médico para garantir que não há contraindicações para você.

1. Caminhada:
É um dos exercícios mais seguros e eficazes para gestantes. Melhora a circulação, ajuda a controlar o ganho de peso e não sobrecarrega as articulações. Comece com 20-30 minutos por dia, em um ritmo confortável, e use calçados adequados.

2. Natação e Hidroginástica:
A água suporta o peso do corpo, aliviando a pressão sobre a coluna e as articulações. A hidroginástica é excelente para fortalecer os músculos e melhorar a capacidade cardiovascular com baixo impacto.

3. Yoga Pré-natal:
Focada em posturas seguras para gestantes, a yoga ajuda a melhorar a flexibilidade, o equilíbrio e a consciência corporal. As técnicas de respiração são especialmente valiosas para o controle da dor durante o trabalho de parto. Procure aulas específicas para gestantes.

4. Alongamentos:
Alongar-se diariamente pode aliviar muitas das dores comuns da gravidez, como dores nas costas e cãibras nas pernas. Concentre-se em alongamentos suaves para pescoço, ombros, costas e panturrilhas. Evite alongamentos que causem dor ou desconforto abdominal.

Sinais para Parar Imediatamente:
Pare de se exercitar e procure seu médico se sentir:
- Tontura ou desmaio
- Sangramento vaginal
- Falta de ar antes de iniciar o exercício
- Dor no peito
- Dor de cabeça intensa
- Contrações uterinas

Lembre-se de ouvir seu corpo. O objetivo não é atingir alta performance, mas sim manter o corpo saudável e a mente tranquila. Movimentar-se com cuidado é um ato de carinho com você e seu bebê.`
    },
    {
      id: 'enxoval-inteligente',
      semana: 25,
      tag: 'Planejamento',
      img: 'https://images.pexels.com/photos/3995914/pexels-photo-3995914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      titulo: "Enxoval inteligente",
      texto: "O que realmente é útil nas primeiras semanas para evitar compras desnecessárias e focar no essencial.",
      textoCompleto: `Montar o enxoval é um dos momentos mais prazerosos da gestação, mas também pode ser uma fonte de ansiedade e gastos excessivos. A chave para um enxoval inteligente é focar na praticidade e no que é verdadeiramente essencial para os primeiros três meses de vida do bebê.

1. Vestuário: Menos é Mais
Bebês crescem muito rápido. Não vale a pena investir em muitas peças tamanho RN (recém-nascido).
- Essenciais: 6-8 bodies de manga curta e longa, 6-8 calças (mijão), 4-6 macacões, 2 casaquinhos, 6 pares de meia.
- Dica: Prefira tecidos de algodão, que são mais confortáveis e antialérgicos. Botões de pressão na frente e entre as pernas facilitam muito a troca de fraldas.

2. Quarto do Bebê: Segurança e Conforto
O ambiente do bebê deve ser, acima de tudo, seguro.
- Essenciais: Um berço com colchão firme e que siga as normas de segurança, 2-3 lençóis de elástico, uma cômoda/trocador.
- Evite: Protetores de berço, travesseiros, bichos de pelúcia e cobertores soltos dentro do berço, pois aumentam o risco de sufocamento. Para o frio, prefira sacos de dormir para bebês.

3. Hora do Banho e Higiene
Simplicidade é a palavra de ordem.
- Essenciais: Banheira com suporte, 2-3 toalhas com capuz, sabonete líquido neutro (da cabeça aos pés), pomada para prevenção de assaduras, algodão em bolas, álcool 70% para o coto umbilical e um kit de tesoura de pontas arredondadas.
- Dica: A temperatura ideal da água é em torno de 37°C. Use o cotovelo para verificar se não está muito quente.

4. Passeio e Transporte
- Essencial: O bebê-conforto é item obrigatório para o transporte no carro e deve ter o selo do INMETRO. Carrinhos podem ser muito úteis, mas escolha um modelo que se adapte ao seu estilo de vida (leve, fácil de fechar, etc.).
- Dica: Um sling ou canguru ergonômico pode ser uma alternativa maravilhosa para manter o bebê pertinho e ter as mãos livres.

Focar no essencial não só economiza dinheiro, mas também reduz o estresse, permitindo que você aproveite mais os momentos preciosos com seu recém-nascido.`
    }
  ]
};


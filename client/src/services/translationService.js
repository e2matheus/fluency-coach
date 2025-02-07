const translations = {
  // Basic dictionary with explanations in Spanish
  "the": {
    word: "el/la",
    explanation: "Artículo definido que se usa para referirse a algo específico"
  },
  "sun": {
    word: "sol",
    explanation: "La estrella central de nuestro sistema solar que nos da luz y calor"
  },
  "was": {
    word: "estaba/era",
    explanation: "Forma pasada del verbo 'ser' o 'estar'"
  },
  "setting": {
    word: "poniéndose",
    explanation: "Cuando el sol desciende en el horizonte al atardecer"
  },
  "over": {
    word: "sobre",
    explanation: "Indica posición encima o por encima de algo"
  },
  "village": {
    word: "pueblo",
    explanation: "Población pequeña, más pequeña que una ciudad"
  },
  "sky": {
    word: "cielo",
    explanation: "El espacio visible sobre la Tierra que vemos cuando miramos hacia arriba"
  },
  "turned": {
    word: "se tornó",
    explanation: "Cambiar de un estado a otro, especialmente referido a colores o estados"
  },
  "orange": {
    word: "naranja",
    explanation: "Color que resulta de la mezcla entre rojo y amarillo"
  },
  "and": {
    word: "y",
    explanation: "Palabra que une o conecta dos elementos en una oración"
  },
  "purple": {
    word: "púrpura",
    explanation: "Color que resulta de la mezcla entre rojo y azul"
  }
};

export const getTranslation = async (word) => {
  const translation = translations[word.toLowerCase()];
  return translation || {
    word: word,
    explanation: "No se encontró traducción"
  };
};

export const getTranslations = async (words) => {
  const translations = {};
  for (const word of words) {
    translations[word.toLowerCase()] = await getTranslation(word);
  }
  return translations;
}; 
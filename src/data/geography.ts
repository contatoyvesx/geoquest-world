// Geography Data - Countries, Capitals, and Brazilian States

export interface Country {
  name: string;
  capital: string;
  flag: string;
}

export interface BrazilianState {
  name: string;
  capital: string;
  abbreviation: string;
}

export const continents: Record<string, Country[]> = {
  africa: [
    { name: "África do Sul", capital: "Pretória", flag: "🇿🇦" },
    { name: "Egito", capital: "Cairo", flag: "🇪🇬" },
    { name: "Nigéria", capital: "Abuja", flag: "🇳🇬" },
    { name: "Marrocos", capital: "Rabat", flag: "🇲🇦" },
    { name: "Quênia", capital: "Nairobi", flag: "🇰🇪" },
    { name: "Etiópia", capital: "Adis Abeba", flag: "🇪🇹" },
    { name: "Gana", capital: "Acra", flag: "🇬🇭" },
    { name: "Argélia", capital: "Argel", flag: "🇩🇿" },
    { name: "Tunísia", capital: "Túnis", flag: "🇹🇳" },
    { name: "Angola", capital: "Luanda", flag: "🇦🇴" },
    { name: "Moçambique", capital: "Maputo", flag: "🇲🇿" },
    { name: "Tanzânia", capital: "Dodoma", flag: "🇹🇿" },
    { name: "Uganda", capital: "Campala", flag: "🇺🇬" },
    { name: "Senegal", capital: "Dacar", flag: "🇸🇳" },
    { name: "Camarões", capital: "Yaoundé", flag: "🇨🇲" },
    { name: "Costa do Marfim", capital: "Yamoussoukro", flag: "🇨🇮" },
    { name: "Líbia", capital: "Trípoli", flag: "🇱🇾" },
    { name: "Zimbábue", capital: "Harare", flag: "🇿🇼" },
    { name: "Sudão", capital: "Cartum", flag: "🇸🇩" },
    { name: "Madagascar", capital: "Antananarivo", flag: "🇲🇬" },
  ],
  america: [
    { name: "Estados Unidos", capital: "Washington D.C.", flag: "🇺🇸" },
    { name: "Canadá", capital: "Ottawa", flag: "🇨🇦" },
    { name: "México", capital: "Cidade do México", flag: "🇲🇽" },
    { name: "Brasil", capital: "Brasília", flag: "🇧🇷" },
    { name: "Argentina", capital: "Buenos Aires", flag: "🇦🇷" },
    { name: "Chile", capital: "Santiago", flag: "🇨🇱" },
    { name: "Colômbia", capital: "Bogotá", flag: "🇨🇴" },
    { name: "Peru", capital: "Lima", flag: "🇵🇪" },
    { name: "Venezuela", capital: "Caracas", flag: "🇻🇪" },
    { name: "Cuba", capital: "Havana", flag: "🇨🇺" },
    { name: "Equador", capital: "Quito", flag: "🇪🇨" },
    { name: "Bolívia", capital: "Sucre", flag: "🇧🇴" },
    { name: "Paraguai", capital: "Assunção", flag: "🇵🇾" },
    { name: "Uruguai", capital: "Montevidéu", flag: "🇺🇾" },
    { name: "Costa Rica", capital: "San José", flag: "🇨🇷" },
    { name: "Panamá", capital: "Cidade do Panamá", flag: "🇵🇦" },
    { name: "Jamaica", capital: "Kingston", flag: "🇯🇲" },
    { name: "Guatemala", capital: "Cidade da Guatemala", flag: "🇬🇹" },
    { name: "Honduras", capital: "Tegucigalpa", flag: "🇭🇳" },
    { name: "El Salvador", capital: "San Salvador", flag: "🇸🇻" },
    { name: "Nicarágua", capital: "Manágua", flag: "🇳🇮" },
    { name: "Haiti", capital: "Porto Príncipe", flag: "🇭🇹" },
    { name: "República Dominicana", capital: "Santo Domingo", flag: "🇩🇴" },
    { name: "Trinidad e Tobago", capital: "Porto de Espanha", flag: "🇹🇹" },
  ],
  asia: [
    { name: "China", capital: "Pequim", flag: "🇨🇳" },
    { name: "Japão", capital: "Tóquio", flag: "🇯🇵" },
    { name: "Índia", capital: "Nova Délhi", flag: "🇮🇳" },
    { name: "Coreia do Sul", capital: "Seul", flag: "🇰🇷" },
    { name: "Tailândia", capital: "Bangkok", flag: "🇹🇭" },
    { name: "Vietnã", capital: "Hanói", flag: "🇻🇳" },
    { name: "Indonésia", capital: "Jacarta", flag: "🇮🇩" },
    { name: "Filipinas", capital: "Manila", flag: "🇵🇭" },
    { name: "Malásia", capital: "Kuala Lumpur", flag: "🇲🇾" },
    { name: "Singapura", capital: "Singapura", flag: "🇸🇬" },
    { name: "Paquistão", capital: "Islamabad", flag: "🇵🇰" },
    { name: "Bangladesh", capital: "Daca", flag: "🇧🇩" },
    { name: "Turquia", capital: "Ancara", flag: "🇹🇷" },
    { name: "Arábia Saudita", capital: "Riade", flag: "🇸🇦" },
    { name: "Emirados Árabes Unidos", capital: "Abu Dhabi", flag: "🇦🇪" },
    { name: "Israel", capital: "Jerusalém", flag: "🇮🇱" },
    { name: "Irã", capital: "Teerã", flag: "🇮🇷" },
    { name: "Iraque", capital: "Bagdá", flag: "🇮🇶" },
    { name: "Cazaquistão", capital: "Astana", flag: "🇰🇿" },
    { name: "Nepal", capital: "Catmandu", flag: "🇳🇵" },
    { name: "Sri Lanka", capital: "Colombo", flag: "🇱🇰" },
    { name: "Mongólia", capital: "Ulan Bator", flag: "🇲🇳" },
    { name: "Coreia do Norte", capital: "Pyongyang", flag: "🇰🇵" },
    { name: "Camboja", capital: "Phnom Penh", flag: "🇰🇭" },
  ],
  europe: [
    { name: "Portugal", capital: "Lisboa", flag: "🇵🇹" },
    { name: "Espanha", capital: "Madri", flag: "🇪🇸" },
    { name: "França", capital: "Paris", flag: "🇫🇷" },
    { name: "Alemanha", capital: "Berlim", flag: "🇩🇪" },
    { name: "Itália", capital: "Roma", flag: "🇮🇹" },
    { name: "Reino Unido", capital: "Londres", flag: "🇬🇧" },
    { name: "Irlanda", capital: "Dublin", flag: "🇮🇪" },
    { name: "Países Baixos", capital: "Amsterdã", flag: "🇳🇱" },
    { name: "Bélgica", capital: "Bruxelas", flag: "🇧🇪" },
    { name: "Suíça", capital: "Berna", flag: "🇨🇭" },
    { name: "Áustria", capital: "Viena", flag: "🇦🇹" },
    { name: "Grécia", capital: "Atenas", flag: "🇬🇷" },
    { name: "Polônia", capital: "Varsóvia", flag: "🇵🇱" },
    { name: "Suécia", capital: "Estocolmo", flag: "🇸🇪" },
    { name: "Noruega", capital: "Oslo", flag: "🇳🇴" },
    { name: "Dinamarca", capital: "Copenhague", flag: "🇩🇰" },
    { name: "Finlândia", capital: "Helsinque", flag: "🇫🇮" },
    { name: "Rússia", capital: "Moscou", flag: "🇷🇺" },
    { name: "Ucrânia", capital: "Kiev", flag: "🇺🇦" },
    { name: "República Tcheca", capital: "Praga", flag: "🇨🇿" },
    { name: "Hungria", capital: "Budapeste", flag: "🇭🇺" },
    { name: "Romênia", capital: "Bucareste", flag: "🇷🇴" },
    { name: "Croácia", capital: "Zagreb", flag: "🇭🇷" },
    { name: "Sérvia", capital: "Belgrado", flag: "🇷🇸" },
  ],
  oceania: [
    { name: "Austrália", capital: "Camberra", flag: "🇦🇺" },
    { name: "Nova Zelândia", capital: "Wellington", flag: "🇳🇿" },
    { name: "Fiji", capital: "Suva", flag: "🇫🇯" },
    { name: "Papua Nova Guiné", capital: "Port Moresby", flag: "🇵🇬" },
    { name: "Samoa", capital: "Apia", flag: "🇼🇸" },
    { name: "Tonga", capital: "Nukualofa", flag: "🇹🇴" },
    { name: "Vanuatu", capital: "Port Vila", flag: "🇻🇺" },
    { name: "Ilhas Salomão", capital: "Honiara", flag: "🇸🇧" },
    { name: "Micronésia", capital: "Palikir", flag: "🇫🇲" },
    { name: "Palau", capital: "Ngerulmud", flag: "🇵🇼" },
    { name: "Kiribati", capital: "Tarawa", flag: "🇰🇮" },
    { name: "Tuvalu", capital: "Funafuti", flag: "🇹🇻" },
  ],
};

export const brazilianStates: BrazilianState[] = [
  { name: "Acre", capital: "Rio Branco", abbreviation: "AC" },
  { name: "Alagoas", capital: "Maceió", abbreviation: "AL" },
  { name: "Amapá", capital: "Macapá", abbreviation: "AP" },
  { name: "Amazonas", capital: "Manaus", abbreviation: "AM" },
  { name: "Bahia", capital: "Salvador", abbreviation: "BA" },
  { name: "Ceará", capital: "Fortaleza", abbreviation: "CE" },
  { name: "Distrito Federal", capital: "Brasília", abbreviation: "DF" },
  { name: "Espírito Santo", capital: "Vitória", abbreviation: "ES" },
  { name: "Goiás", capital: "Goiânia", abbreviation: "GO" },
  { name: "Maranhão", capital: "São Luís", abbreviation: "MA" },
  { name: "Mato Grosso", capital: "Cuiabá", abbreviation: "MT" },
  { name: "Mato Grosso do Sul", capital: "Campo Grande", abbreviation: "MS" },
  { name: "Minas Gerais", capital: "Belo Horizonte", abbreviation: "MG" },
  { name: "Pará", capital: "Belém", abbreviation: "PA" },
  { name: "Paraíba", capital: "João Pessoa", abbreviation: "PB" },
  { name: "Paraná", capital: "Curitiba", abbreviation: "PR" },
  { name: "Pernambuco", capital: "Recife", abbreviation: "PE" },
  { name: "Piauí", capital: "Teresina", abbreviation: "PI" },
  { name: "Rio de Janeiro", capital: "Rio de Janeiro", abbreviation: "RJ" },
  { name: "Rio Grande do Norte", capital: "Natal", abbreviation: "RN" },
  { name: "Rio Grande do Sul", capital: "Porto Alegre", abbreviation: "RS" },
  { name: "Rondônia", capital: "Porto Velho", abbreviation: "RO" },
  { name: "Roraima", capital: "Boa Vista", abbreviation: "RR" },
  { name: "Santa Catarina", capital: "Florianópolis", abbreviation: "SC" },
  { name: "São Paulo", capital: "São Paulo", abbreviation: "SP" },
  { name: "Sergipe", capital: "Aracaju", abbreviation: "SE" },
  { name: "Tocantins", capital: "Palmas", abbreviation: "TO" },
];

export const continentNames: Record<string, string> = {
  africa: "África",
  america: "América",
  asia: "Ásia",
  europe: "Europa",
  oceania: "Oceania",
  all: "Todos",
};

export function getAllCountries(): Country[] {
  return Object.values(continents).flat();
}

export function getCountriesByContinent(continent: string): Country[] {
  if (continent === "all") {
    return getAllCountries();
  }
  return continents[continent] || [];
}

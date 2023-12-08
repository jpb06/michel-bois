export interface SeededDocument {
  fileName: string;
  key: string;
  month?: number;
  year?: number;
  name: string;
  description?: string;
  comments?: string[];
  tags?: string[];
}

export const documentsSeedData: SeededDocument[] = [
  {
    key: '1998 - Clue Italie',
    fileName: '1998 - Clue Italie.JPG',
    name: 'Clue Italie',
    year: 1998,
    tags: ['italie', 'pont'],
  },
  {
    key: '1998 - Jean de Vienne',
    fileName: '1998 - Jean de Vienne.JPG',
    name: 'Jean de Vienne',
    year: 1998,
    tags: ['mer', 'vaisseau', 'port'],
  },
  {
    key: '1998 - Nice',
    fileName: '1998 - Nice.jpg',
    name: 'Nice',
    year: 1998,
    tags: ['mediterranee', 'mer', 'port', 'Alpes maritimes'],
  },
  {
    key: '2001 - Olivier du mont Vinaigrier',
    fileName: '2001 - Olivier du mont Vinaigrier.jpg',
    name: 'Olivier du mont Vinaigrier',
    year: 2001,
    tags: ['arbre'],
  },
  {
    key: '2005 - Araignee',
    fileName: '2005 - Araignee.jpg',
    name: 'Araignée',
    year: 2005,
    tags: ['Charente maritime'],
  },
  {
    key: '2009 - Bataille Chatelaillon',
    fileName: '2009 - Bataille Chatelaillon.jpg',
    name: 'Bataillé Chatelaillon',
    year: 2009,
    tags: ['Charente maritime'],
  },
  {
    key: '2009 - Carpe',
    fileName: '2009 - Carpe.jpg',
    name: 'Carpe',
    year: 2009,
    tags: ['poisson'],
  },
  {
    key: "2012 - Parc Estiennes d'Orves",
    fileName: "2012 - Parc Estiennes d'Orves.jpeg",
    name: "Parc Estiennes d'Orves",
    year: 2012,
    tags: ['Alpes maritimes'],
  },
  {
    key: '2017 - Ventotene',
    fileName: '2017 - Ventotene.jpg',
    name: 'Ventotene',
    year: 2017,
    tags: ['Italie', 'mer'],
  },
  {
    key: 'Acqueduc Antibes',
    fileName: 'Acqueduc Antibes.jpg',
    name: "Acqueduc d'Antibes",
    tags: ['Alpes maritimes', 'pont'],
  },
  {
    key: 'Bataille',
    fileName: 'Bataille.jpg',
    name: 'Bataillé',
    tags: ['Charente maritime'],
  },
  {
    key: 'Unknown - 18',
    fileName: 'Unknown - 18.jpg',
    name: 'Unconnu',
  },
];

import type { PersistUserInput } from '@layers/types';

export interface SeededUserData extends PersistUserInput {
  password: string;
}

export const usersData: SeededUserData[] = [
  {
    name: 'jpb06',
    email: 'jp.bois.06@outlook.fr',
    emailVerified: true,
    password: 'jpb06',
  },
  {
    name: 'Yolo Lina',
    email: 'yolo.lina@cool.org',
    emailVerified: false,
    password: 'yolo',
  },
];

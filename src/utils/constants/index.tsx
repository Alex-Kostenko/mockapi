import { IUser } from '../types';

export const INITIAL_USER: IUser = {
  name: '',
  age: '',
  about: '',
};

export const languageSelect = (t: (t: string) => void) => [
  {
    value: 'en',
    label: <>🇬🇧{' ' + t('defaultMenu.en')}</>,
  },
  {
    value: 'uk',
    label: <> 🇺🇦{' ' + t('defaultMenu.uk')}</>,
  },
];

export const PAGE_SIZE_LIST: number[] = [5, 10, 20];

export const PADDINGS = {
  s: '5px',
  m: '10px',
  l: '16px',
  xl: '20px',
  xxl: '30px',
};

export const SCALES = {
  borderRadius: '4px',
};

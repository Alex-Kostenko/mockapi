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

export const PageSizeList: number[] = [5, 10, 20];

export const Paddings = {
  s: '5px',
  m: '10px',
  l: '16px',
  xl: '20px',
  xxl: '30px',
  xxxl: '48px',
};

export const Scales = {
  borderRadius: '4px',
};

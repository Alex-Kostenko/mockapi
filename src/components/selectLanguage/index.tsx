import React from 'react';
import { useTranslation } from 'react-i18next';

import i18n from '../../i18n';
import { languageSelect } from '../../utils/constants';
import { LanguagesCode } from '../../utils/i18n';
import { StyledSelect } from './styles';

const SelectLanguage = () => {
  const { t } = useTranslation();

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <StyledSelect>
      <select
        className="language-select"
        defaultValue={LanguagesCode.english}
        onChange={(e) => handleChange(e.target.value)}
      >
        {languageSelect(t).map((language) => (
          <option key={language.value} value={language.value}>
            {language.label}
          </option>
        ))}
      </select>
    </StyledSelect>
  );
};

export { SelectLanguage };

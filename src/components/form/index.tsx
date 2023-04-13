import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames';

import { INITIAL_USER } from '../../utils/constants';
import { UserFieldsEnum } from '../../utils/enums';
import { lettersRegExp, positiveNumbersRegex } from '../../utils/regex';
import { IFormErrors, IUser } from '../../utils/types';
import CancelButton from '../buttons/cancel';
import LoadButton from '../loadButton';
import { StyledForm } from './styles';

interface FormProps {
  handleSaveUser: () => void;
  newUser: IUser;
  setNewUser: Dispatch<SetStateAction<IUser>>;
  handleCancelButton: () => void;
  isLoading: boolean;
}

const Form: FC<FormProps> = ({
  handleSaveUser,
  newUser,
  setNewUser,
  handleCancelButton,
  isLoading,
}) => {
  const [errors, setErrors] = useState<IFormErrors>(INITIAL_USER);
  const [isSubmit, setIsSubmit] = useState(false);
  const { t } = useTranslation();

  const ValidatonErrors = {
    name: t('errors.name'),
    age: t('errors.age'),
    about: t('errors.about'),
    ageRequired: t('errors.ageRequired'),
    nameRequired: t('errors.nameRequired'),
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const validateField = (name: string, value: string) => {
    switch (name) {
      case UserFieldsEnum.Name:
        return lettersRegExp.test(value) && value.length < 400
          ? ''
          : ValidatonErrors.name;
      case UserFieldsEnum.Age:
        return positiveNumbersRegex.test(value) ? '' : ValidatonErrors.age;
      case UserFieldsEnum.About:
        return value.length > 4000 ? ValidatonErrors.about : '';
      default:
        return '';
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmit(true);
    if (!isError) {
      handleSaveUser();
    } else {
      setErrors({
        ...errors,
        name: !newUser.name ? ValidatonErrors.nameRequired : errors.name,
        age: !newUser.age ? ValidatonErrors.ageRequired : errors.age,
      });
    }
  };

  const isError = useMemo(
    () => Object.values(errors).some(Boolean) || !newUser.name || !newUser.age,
    [newUser, errors],
  );

  return (
    <StyledForm onSubmit={handleSubmit}>
      <div className="form-input">
        <label
          htmlFor="name-input"
          className={classNames('input-label', { error: errors.name })}
        >
          {UserFieldsEnum.Name}: *
          <input
            className={classNames('input-base', { error: errors.name })}
            type="text"
            value={newUser.name}
            name={UserFieldsEnum.Name}
            onChange={handleInputChange}
            placeholder={`${t('defaultMenu.enter')} ${t('defaultMenu.name')}`}
            id="name-input"
          />
        </label>
        <div className="error-text error">{errors.name}</div>
      </div>
      <div className="form-input">
        <label
          htmlFor="age-input"
          className={classNames('input-label', { error: errors.age })}
        >
          {UserFieldsEnum.Age}: *
          <input
            className={classNames('input-base', { error: errors.age })}
            type="text"
            name={UserFieldsEnum.Age}
            value={newUser.age}
            onChange={handleInputChange}
            placeholder={`${t('defaultMenu.enter')} ${t('defaultMenu.age')}`}
            id="age-input"
          />
        </label>
        <div className="error-text error">{errors.age}</div>
      </div>
      <div className="form-input">
        <label htmlFor="about-input" className="input-label">
          {UserFieldsEnum.About}:
          <input
            className={classNames('input-base', { error: errors.about })}
            type="text"
            name={UserFieldsEnum.About}
            value={newUser.about}
            onChange={handleInputChange}
            placeholder={`${t('defaultMenu.enter')} ${t('defaultMenu.about')}`}
            id="about-input"
          />
        </label>
        <div className="error-text error">{errors.about}</div>
      </div>
      <div className="footer">
        <CancelButton
          title={t('buttons.cancel')}
          onClick={handleCancelButton}
        />
        <LoadButton
          type="submit"
          title={t('defaultMenu.ok')}
          isLoading={isLoading}
          disabled={isSubmit && isError}
        />
      </div>
    </StyledForm>
  );
};

export default Form;

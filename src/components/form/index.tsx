import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { UserFieldsEnum } from '../../utils/enums';
import { capitalizeFirstLetter } from '../../utils/helpers';
import { lettersRegExp, positiveNumbersRegex } from '../../utils/regex';
import { IFormErrors, IUser } from '../../utils/types';
import LoadButton from '../loadButton';
import { StyledForm } from './styles';

interface FormProps {
  handleSaveUser: (event: { preventDefault: () => void }) => void;
  newUser: IUser;
  setNewUser: Dispatch<SetStateAction<IUser>>;
  errors: IFormErrors;
  setErrors: Dispatch<SetStateAction<IFormErrors>>;
  handleCancelButton: () => void;
  isLoading: boolean;
}

const Form: FC<FormProps> = ({
  handleSaveUser,
  newUser,
  setNewUser,
  errors,
  setErrors,
  handleCancelButton,
  isLoading,
}) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const { t } = useTranslation();

  const VALIDATIONS_ERRORS: IUser = {
    name: t('errors.name'),
    age: t('errors.age'),
    about: t('errors.about'),
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
          : VALIDATIONS_ERRORS.name;
      case UserFieldsEnum.Age:
        return positiveNumbersRegex.test(value) ? '' : VALIDATIONS_ERRORS.age;
      case UserFieldsEnum.About:
        return value.length > 4000 ? VALIDATIONS_ERRORS.about : '';
      default:
        return '';
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmit(true);
    if (!isError) {
      handleSaveUser(event);
    }
  };

  const isError = useMemo(
    () => Object.values(errors).some(Boolean) || !newUser.name || !newUser.age,
    [newUser, errors],
  );

  useEffect(() => {
    if (isSubmit) {
      if (!newUser.name) {
        setErrors({ ...errors, name: 'Name is required' });
      }
      if (!newUser.age) {
        setErrors({ ...errors, age: 'Age is required' });
      }
    }
  }, [isSubmit, newUser.age, newUser.name, setErrors, errors]);

  return (
    <StyledForm onSubmit={handleSubmit}>
      <div className="form-input">
        <label className={`input-label ${errors.name ? 'error' : ''}`}>
          {`${capitalizeFirstLetter(UserFieldsEnum.Name)}:*`}
        </label>
        <input
          className={`input-base ${errors.name ? 'error' : ''}`}
          type="text"
          value={newUser.name}
          name={UserFieldsEnum.Name}
          onChange={handleInputChange}
          placeholder={`${t('defaultMenu.enter')} ${t('defaultMenu.name')}`}
        />
        <label className="error-text error">{errors.name}</label>
      </div>
      <div className="form-input">
        <label className={`input-label ${errors.age ? 'error' : ''}`}>
          {`${capitalizeFirstLetter(UserFieldsEnum.Age)}:*`}
        </label>
        <input
          className={`input-base ${errors.age ? 'error' : ''}`}
          type="text"
          name={UserFieldsEnum.Age}
          value={newUser.age}
          onChange={handleInputChange}
          placeholder={`${t('defaultMenu.enter')} ${t('defaultMenu.age')}`}
        />
        <label className="error-text error">{errors.age}</label>
      </div>
      <div className="form-input">
        <label className="input-label">
          {capitalizeFirstLetter(UserFieldsEnum.About) + ':'}
        </label>
        <input
          className={`input-base ${errors.about ? 'error' : ''}`}
          type="text"
          name={UserFieldsEnum.About}
          value={newUser.about}
          onChange={handleInputChange}
          placeholder={`${t('defaultMenu.enter')} ${t('defaultMenu.about')}`}
        />
        <label className="error-text error">{errors.about}</label>
      </div>
      <div className="footer">
        <button className="modal-btn cancel-btn" onClick={handleCancelButton}>
          {t('buttons.cancel')}
        </button>
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

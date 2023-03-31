import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
} from 'react';

import { lettersRegExp, positiveNumbersRegex } from '../../utils/regex';
import { VALIDATIONS_ERRORS } from '../../utils/constants';
import { FormErrors, IUser } from '../../utils/types';
import { StyledForm } from './styles';

interface Props {
  handleSaveUser: (event: { preventDefault: () => void }) => void;
  newUser: IUser;
  setNewUser: Dispatch<SetStateAction<IUser>>;
  errors: FormErrors;
  setErrors: Dispatch<SetStateAction<FormErrors>>;
}

const Form: FC<Props> = ({
  handleSaveUser,
  newUser,
  setNewUser,
  errors,
  setErrors,
}) => {
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        return lettersRegExp.test(value) && value.length < 400
          ? ''
          : VALIDATIONS_ERRORS.name;
      case 'age':
        return positiveNumbersRegex.test(value) && Number(value) < 200
          ? ''
          : VALIDATIONS_ERRORS.age;
      case 'about':
        return value.length > 4000 ? VALIDATIONS_ERRORS.about : '';
      default:
        return '';
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      Object.values(errors).every((error) => !error) &&
      newUser.name &&
      newUser.age
    ) {
      handleSaveUser(event);
    }
  };

  return (
    <StyledForm errors={errors} onSubmit={handleSubmit}>
      <input
        type="text"
        value={newUser.name}
        name="name"
        onChange={handleInputChange}
        placeholder="Enter name"
      />
      <label className="error">{errors.name}</label>
      <input
        type="text"
        name="age"
        value={newUser.age}
        onChange={handleInputChange}
        placeholder="Enter age"
      />
      <label className="error">{errors.age}</label>
      <input
        type="text"
        name="about"
        value={newUser.about}
        onChange={handleInputChange}
        placeholder="Enter about"
      />
      <label className="error">{errors.about}</label>
      <button
        type="submit"
        className="submit-btn"
        disabled={
          Object.values(errors).some(Boolean) || !newUser.name || !newUser.age
        }
      >
        Ok
      </button>
    </StyledForm>
  );
};

export default Form;

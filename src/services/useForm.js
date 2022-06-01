import React from 'react';
import { createUser } from './user';

function useForm() {
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    password: '',
    passwordRepeat: '',
  });
  const [role, setRole] = React.useState('');
  const [error, setError] = React.useState('');

  function addInputValue(e) {
    const name = e.target.name;
    const value = e.target.value;
    setForm({ ...form, [name]: value });
  };

  function validatedForm() {
    const regex = /[\w.\-+]+@[\w-]+\.[\w-.]/gi;
    const validatedEmail = regex.test(form.email);

    if (form.name && form.email && validatedEmail && form.password && form.passwordRepeat && role) {
      if (form.password !== form.passwordRepeat) {
        setError('As duas senhas não coincidem. Digite-as novamente!');
        return false;
      } else {
        setError(null);
        return true;
      }
    } else if (form.email && validatedEmail && form.password) {
      setError(null);
      return true;
    } else if(form.email !== validatedEmail) {
      setError('Preencha o campo de email corretamente!');
      return false;
    } else {
      setError('Preencha todos os campos!');
      return false;
    }
  }

  function sendForm(e) {
    e.preventDefault();
    const validation = validatedForm();
    if (validation) {
      createUser(form.name, form.email, form.password, role).then((response) => {
        switch (response.status) {
          case 200:
            alert('página de menu');
            break;
          case 403:
            setError('Email já cadastrado!');
            break;
          default:
            setError('Erro, tente novamente!');
        }
      });
    }
  }

  function cleanForm(e) {
    e.preventDefault();
    setForm({
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
      role: '',
    });
    setRole('');
    setError('');
  }

  return { addInputValue, sendForm, cleanForm, form, role, error, setRole };
}

export default useForm;

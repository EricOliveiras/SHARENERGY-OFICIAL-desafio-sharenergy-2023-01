import * as yup from 'yup'

export const creeateClient = yup.object({
  name: yup.string().required('Campo nome requerido').min(4, 'O nome deve conter no minimo 4 caracterees'),
  cpf: yup.string().required('Campo CPF requerido').min(11, 'O CPF deve conter no minimo 11 caracterees').max(11, 'E no máximo 11'),
  email: yup.string().required('Campo email requerido').email('Formato do email inválido').lowercase('Email deve estar em letras minúsculas'),
}).required();

export const updateClient = yup.object({
  name: yup.string().required().min(4, 'O nome deve conter no minimo 4 caracterees'),
  cpf: yup.string().required().min(11, 'O CPF deve conter no minimo 11 caracterees').max(11, 'E no máximo 11'),
  email: yup.string().email('Formato do email inválido').lowercase('Email deve estar em letras minúsculas'),
})
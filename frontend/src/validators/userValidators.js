import * as yup from 'yup'

export const creeateUser = yup.object({
  username: yup.string().required('Campo nome de usuário requerido').min(4, 'O nome de usuário deve conter no minimo 4 caracterees'),
  email: yup.string().required('Campo email requerido').email('Formato do email inválido'),
  password: yup.string().required('Campo senha requerido').min(4, 'A senha deve conter no minimo 4 caracterees'),
  passwordConfirmation: yup.string().required('Campo confirmação de senha requerido').oneOf([yup.ref('password')], 'Senha não combina')
}).required();

export const loginUser = yup.object({
  username: yup.string().required('Campo nome de usuário requerido'),
  password: yup.string().required('Campo senha requerido')
}).required();
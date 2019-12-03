import LoginApi from '../service/login';

export const login = (successCallback: Function) => {
  LoginApi.login(successCallback);
};

import LoginForm from 'msps/lib/components/forms/LoginForm/LoginForm';

const LoginPage = () => {
  return (
    <LoginForm
      data={{
        username: '',
        password: '',
      }}
    />
  );
};

export default LoginPage;

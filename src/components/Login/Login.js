import './Login.css'
import Form from '../Form/Form'

const Login = ({serverError}) => {
    return (
        <div className="login">
            <Form
                name="login"
                title="Рады видеть!"
                buttonText="Войти"
                inputs={[
                    {
                        id: 0,
                        type: 'email',
                        name: 'email',
                        required: 'required',
                        minLength: '5',
                        maxLength: '30',
                        title: 'E-mail',
                        value: 'pochta@yandex.ru',
                    },
                    {
                        id: 1,
                        type: 'password',
                        name: 'password',
                        required: 'required',
                        minLength: '8',
                        maxLength: '20',
                        title: 'Пароль'
                    },
                ]}
                text="Ещё не зарегистрированы?"
                navText="Регистрация"
                navLink="/signup"
                serverError={serverError}
            >

            </Form>
        </div>

    );
}

export default Login;
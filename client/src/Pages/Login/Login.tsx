import { NavLink } from "react-router-dom";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import logo from "../../assets/logo.png";

function getNavLinkClass({ isActive }: { isActive: boolean }) {
  // line 5
  return isActive ? "form__link form__link_active" : "form__link";
}

export default function Login() {
  const { values, errors, isValid, handleChange } = useFormWithValidation();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <div className="auth-page">
      <header className="header">
        <img className="header__logo" alt="MeshAI logo" src={logo} />
      </header>
      <main>
        <form className="form" onSubmit={handleSubmit} noValidate>
          <h1 className="from__title">Login</h1>

          <nav className="form__nav">
            <NavLink to="/login" className={getNavLinkClass}>
              Login
            </NavLink>
            <NavLink to="/register" className={getNavLinkClass}>
              Register
            </NavLink>
          </nav>

          <input
            className="form__input"
            type="email"
            name="email"
            placeholder="Email"
            required
            value={values.email ?? ""}
            onChange={handleChange}
          />
          <input
            className="form__input"
            type="password"
            name="password"
            placeholder="Password"
            required
            minLength={8}
            value={values.password ?? ""}
            onChange={handleChange}
          />

          <p className="form__error" aria-live="polite">
            {errors.email || errors.password}
          </p>

          <button className="form__submit" type="submit" disabled={!isValid}>
            Login
          </button>
        </form>
      </main>
    </div>
  );
}

import { NavLink } from "react-router-dom";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { getNavLinkClass } from "../../utils/navLinkClass";
import logo from "../../assets/logo.png";

export default function Register() {
  const { values, errors, isValid, handleChange } = useFormWithValidation();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values); // the API call comes in the next lesson
  };

  return (
    <div className="auth-page">
      <header className="header">
        <img className="header__logo" alt="MeshAI logo" src={logo} />
      </header>
      <main>
        <form className="form" onSubmit={handleSubmit} noValidate>
          <h1 className="form__title">Register</h1>
          {/* add the subtitle or other text from Figma here */}

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
            type="text"
            name="name"
            placeholder="Name"
            required
            minLength={2}
            maxLength={40}
            value={values.name ?? ""}
            onChange={handleChange}
          />
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
            {errors.name || errors.email || errors.password}
          </p>

          <button className="form__submit" type="submit" disabled={!isValid}>
            Register
          </button>
        </form>
      </main>
    </div>
  );
}

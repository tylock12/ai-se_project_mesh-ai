import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { getNavLinkClass } from "../../utils/navLinkClass";
import { loginUser } from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/logo.png";

export default function Login() {
  const { values, errors, isValid, handleChange } = useFormWithValidation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const res = await loginUser(values.email, values.password);
      if (res.data) {
        login(res.data.token, res.data.user);
        navigate("/knowledge");
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
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
            {submitError || errors.email || errors.password}
          </p>

          <button
            className="form__submit"
            type="submit"
            disabled={!isValid || isSubmitting}
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
}

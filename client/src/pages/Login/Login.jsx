import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import { getApiErrorMessage } from "../../services/apiClient";
import { loginUser } from "../../services/authService";
import "../auth.css";

const initialFormData = { email: "", password: "" };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionError, setActionError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: "" }));
    setActionError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setActionError("");

    const email = formData.email.trim();
    const nextErrors = {};
    if (!email) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!formData.password) {
      nextErrors.password = "Password is required.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      await loginUser({ email, password: formData.password });
      navigate("/", { replace: true });
    } catch (requestError) {
      setActionError(
        getApiErrorMessage(requestError, "Unable to log in. Please try again."),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-page" aria-labelledby="login-title">
      <header className="auth-page__header">
        <p className="auth-page__eyebrow">INVENTORY MANAGEMENT SYSTEM</p>
        <h1 className="auth-page__title" id="login-title">
          Welcome back
        </h1>
        <p className="auth-page__intro">
          Sign in with the email and password for your account.
        </p>
      </header>

      <div className="auth-card">
        <h2 className="auth-card__title">Login</h2>
        {actionError && (
          <p className="auth-message auth-message--error" role="alert">
            {actionError}
          </p>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-form__field">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "login-email-error" : undefined}
            />
            {errors.email && (
              <p className="auth-form__error" id="login-email-error">
                {errors.email}
              </p>
            )}
          </div>

          <div className="auth-form__field">
            <label htmlFor="login-password">Password</label>
            <div className="auth-form__input-wrapper">
              <input
                id="login-password"
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "login-password-error" : undefined
                }
              />
              <button
                className="auth-form__password-toggle"
                type="button"
                aria-label={
                  isPasswordVisible ? "Hide password" : "Show password"
                }
                aria-pressed={isPasswordVisible}
                aria-controls="login-password"
                onClick={() => setIsPasswordVisible((visible) => !visible)}
                disabled={isSubmitting}
              >
                {isPasswordVisible ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="auth-form__error" id="login-password-error">
                {errors.password}
              </p>
            )}
          </div>

          <Button className="auth-form__submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Login"}
          </Button>
        </form>

        <p className="auth-card__footer">
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;

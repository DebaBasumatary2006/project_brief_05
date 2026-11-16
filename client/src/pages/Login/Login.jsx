import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import { getApiErrorMessage } from "../../services/apiClient";
import { loginUser } from "../../services/authService";
import "../auth.css";

const initialFormData = { email: "", password: "" };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Login() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionError, setActionError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: "" }));
    setActionError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setActionError("");
    setSuccessMessage("");

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
      const response = await loginUser({ email, password: formData.password });
      setSuccessMessage(`Login successful. Welcome, ${response.data.name}.`);
      setFormData(initialFormData);
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
        {successMessage && (
          <p className="auth-message auth-message--success" role="status">
            {successMessage}
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
            <input
              id="login-password"
              name="password"
              type="password"
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

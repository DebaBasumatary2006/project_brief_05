import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import { getApiErrorMessage } from "../../services/apiClient";
import { registerUser } from "../../services/authService";
import "../auth.css";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Register() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionError, setActionError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const togglePasswordVisibility = (fieldName) => {
    setPasswordVisibility((currentVisibility) => ({
      ...currentVisibility,
      [fieldName]: !currentVisibility[fieldName],
    }));
  };

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

    const name = formData.name.trim();
    const email = formData.email.trim();
    const nextErrors = {};

    if (!name) {
      nextErrors.name = "Name is required.";
    } else if (name.length < 2 || name.length > 60) {
      nextErrors.name = "Name must contain between 2 and 60 characters.";
    }
    if (!email) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!formData.password) {
      nextErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      nextErrors.password = "Password must contain at least 8 characters.";
    }
    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = "Confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await registerUser({
        name,
        email,
        password: formData.password,
      });
      setSuccessMessage(response.message || "Account created successfully.");
      setFormData(initialFormData);
    } catch (requestError) {
      setActionError(
        getApiErrorMessage(
          requestError,
          "Unable to create the account. Please try again.",
        ),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-page" aria-labelledby="register-title">
      <header className="auth-page__header">
        <p className="auth-page__eyebrow">INVENTORY MANAGEMENT SYSTEM</p>
        <h1 className="auth-page__title" id="register-title">
          Create your account
        </h1>
        <p className="auth-page__intro">
          Register to get started with the inventory system.
        </p>
      </header>

      <div className="auth-card">
        <h2 className="auth-card__title">Register</h2>
        {actionError && (
          <p className="auth-message auth-message--error" role="alert">
            {actionError}
          </p>
        )}
        {successMessage && (
          <p className="auth-message auth-message--success" role="status">
            {successMessage} <Link to="/login">Sign in</Link>
          </p>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="auth-form__field">
            <label htmlFor="register-name">Name</label>
            <input
              id="register-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              maxLength={60}
              required
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "register-name-error" : undefined}
            />
            {errors.name && (
              <p className="auth-form__error" id="register-name-error">
                {errors.name}
              </p>
            )}
          </div>

          <div className="auth-form__field">
            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? "register-email-error" : undefined
              }
            />
            {errors.email && (
              <p className="auth-form__error" id="register-email-error">
                {errors.email}
              </p>
            )}
          </div>

          <div className="auth-form__field">
            <label htmlFor="register-password">Password</label>
            <div className="auth-form__input-wrapper">
              <input
                id="register-password"
                name="password"
                type={passwordVisibility.password ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                minLength={8}
                required
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "register-password-error" : undefined
                }
              />
              <button
                className="auth-form__password-toggle"
                type="button"
                aria-label={
                  passwordVisibility.password
                    ? "Hide password"
                    : "Show password"
                }
                aria-pressed={passwordVisibility.password}
                aria-controls="register-password"
                onClick={() => togglePasswordVisibility("password")}
                disabled={isSubmitting}
              >
                {passwordVisibility.password ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="auth-form__error" id="register-password-error">
                {errors.password}
              </p>
            )}
          </div>

          <div className="auth-form__field">
            <label htmlFor="register-confirm-password">Confirm Password</label>
            <div className="auth-form__input-wrapper">
              <input
                id="register-confirm-password"
                name="confirmPassword"
                type={
                  passwordVisibility.confirmPassword ? "text" : "password"
                }
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={
                  errors.confirmPassword
                    ? "register-confirm-password-error"
                    : undefined
                }
              />
              <button
                className="auth-form__password-toggle"
                type="button"
                aria-label={
                  passwordVisibility.confirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                aria-pressed={passwordVisibility.confirmPassword}
                aria-controls="register-confirm-password"
                onClick={() => togglePasswordVisibility("confirmPassword")}
                disabled={isSubmitting}
              >
                {passwordVisibility.confirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="auth-form__error" id="register-confirm-password-error">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <Button className="auth-form__submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Register"}
          </Button>
        </form>

        <p className="auth-card__footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}

export default Register;

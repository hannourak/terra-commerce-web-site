import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Connexion impossible.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={styles.wrap}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={{ marginBottom: 24 }}>Connexion</h1>

        <div style={styles.field}>
          <label>Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div style={styles.field}>
          <label>Mot de passe</label>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        {error && <p style={{ color: "var(--flame)", marginBottom: 12 }}>{error}</p>}

        <button className="btn btn-primary" style={{ width: "100%" }} disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        <p style={{ marginTop: 16, fontSize: "0.9rem" }}>
          Pas encore de compte ? <Link to="/register" style={{ textDecoration: "underline" }}>S'inscrire</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  wrap: {
    display: "flex",
    justifyContent: "center",
    padding: "72px 24px",
  },
  form: {
    width: "100%",
    maxWidth: 380,
  },
  field: {
    marginBottom: 16,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
};

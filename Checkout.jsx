import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", address: "", city: "", phone: "" });
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    setPlacing(true);
    setError("");
    try {
      await api.post("/orders", {
        items: cart.map((item) => ({
          product: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress: form,
        total,
      });
      clearCart();
      navigate("/order-success");
    } catch (err) {
      setError(err.response?.data?.message || "Une erreur est survenue.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="container" style={styles.wrap}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={{ marginBottom: 24 }}>Livraison</h1>

        <div style={styles.field}>
          <label>Nom complet</label>
          <input name="fullName" required value={form.fullName} onChange={handleChange} />
        </div>
        <div style={styles.field}>
          <label>Adresse</label>
          <input name="address" required value={form.address} onChange={handleChange} />
        </div>
        <div style={styles.field}>
          <label>Ville</label>
          <input name="city" required value={form.city} onChange={handleChange} />
        </div>
        <div style={styles.field}>
          <label>Téléphone</label>
          <input name="phone" required value={form.phone} onChange={handleChange} />
        </div>

        {error && <p style={{ color: "var(--flame)", marginBottom: 12 }}>{error}</p>}

        <button className="btn btn-primary" style={{ width: "100%" }} disabled={placing}>
          {placing ? "Traitement..." : `Confirmer la commande — ${total.toFixed(2)} DT`}
        </button>
        <p style={{ fontSize: "0.8rem", color: "var(--ink)", marginTop: 10 }}>
          Paiement fictif à des fins de démonstration — aucune carte n'est requise.
        </p>
      </form>

      <div style={styles.summary}>
        <h2 style={{ fontSize: "1.1rem", marginBottom: 16 }}>Résumé</h2>
        {cart.map((item) => (
          <div key={item.id} style={styles.line}>
            <span>{item.name} × {item.quantity}</span>
            <span>{(item.price * item.quantity).toFixed(2)} DT</span>
          </div>
        ))}
        <div style={{ ...styles.line, borderTop: "2px solid var(--ink)", paddingTop: 12, marginTop: 12, fontWeight: 500 }}>
          <span>Total</span>
          <span>{total.toFixed(2)} DT</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrap: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: 64,
    padding: "56px 24px",
    alignItems: "start",
  },
  form: {
    maxWidth: 420,
  },
  field: {
    marginBottom: 16,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  summary: {
    background: "var(--sand)",
    border: "2px solid var(--ink)",
    padding: 24,
  },
  line: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.9rem",
    marginBottom: 8,
  },
};

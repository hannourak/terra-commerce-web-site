import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, total } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container" style={styles.empty}>
        <h2 style={{ marginBottom: 12 }}>Votre panier est vide</h2>
        <p style={{ marginBottom: 24, color: "var(--ink)" }}>
          Découvrez nos objets et ajoutez-en un à votre panier.
        </p>
        <Link to="/" className="btn btn-primary">Voir la boutique</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "56px 24px" }}>
      <h1 style={{ marginBottom: 32 }}>Votre panier</h1>

      <div style={styles.list}>
        {cart.map((item) => (
          <div key={item.id} style={styles.row}>
            <img src={item.image} alt={item.name} style={styles.thumb} />
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: "1rem", marginBottom: 4 }}>{item.name}</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--ink)" }}>
                {item.price.toFixed(2)} DT
              </p>
            </div>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
              style={{ width: 64 }}
            />
            <p style={{ width: 90, textAlign: "right", fontWeight: 500 }}>
              {(item.price * item.quantity).toFixed(2)} DT
            </p>
            <button
              onClick={() => removeFromCart(item.id)}
              style={styles.remove}
            >
              Retirer
            </button>
          </div>
        ))}
      </div>

      <div style={styles.summary}>
        <div style={styles.totalRow}>
          <span>Total</span>
          <span style={{ fontWeight: 500 }}>{total.toFixed(2)} DT</span>
        </div>
        <button
          className="btn btn-primary"
          style={{ width: "100%", marginTop: 16 }}
          onClick={() => navigate("/checkout")}
        >
          Passer la commande
        </button>
      </div>
    </div>
  );
}

const styles = {
  empty: {
    padding: "96px 24px",
    textAlign: "center",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    borderTop: "2px solid var(--ink)",
    paddingTop: 20,
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    borderBottom: "2px solid var(--ink)",
    paddingBottom: 20,
  },
  thumb: {
    width: 72,
    height: 90,
    objectFit: "cover",
    border: "2px solid var(--ink)",
  },
  remove: {
    background: "none",
    fontSize: "0.85rem",
    textDecoration: "underline",
    color: "var(--flame)",
  },
  summary: {
    maxWidth: 320,
    marginLeft: "auto",
    marginTop: 32,
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "1.1rem",
  },
};

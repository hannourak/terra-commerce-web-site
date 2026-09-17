import { Link, useNavigate } from "react-router-dom";
import { Settings, LogOut, User, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const categories = ["Cuisine", "Textile", "Céramique", "Luminaire", "Promotions"];

  return (
    <header>
      <div style={styles.topBar}>
        <div className="container" style={styles.topInner}>
          <Link to="/" style={styles.logo}>Terra</Link>

          <input
            placeholder="Rechercher un objet, une catégorie..."
            style={styles.search}
          />

          <div style={styles.iconsRow}>
            {user?.role === "admin" && (
              <Link to="/admin" style={styles.iconLink}>
                <Settings size={20} />
                <span style={styles.iconLabel}>Admin</span>
              </Link>
            )}
            {user ? (
              <button style={styles.iconLink} onClick={() => { logout(); navigate("/"); }}>
                <LogOut size={20} />
                <span style={styles.iconLabel}>Déconnexion</span>
              </button>
            ) : (
              <Link to="/login" style={styles.iconLink}>
                <User size={20} />
                <span style={styles.iconLabel}>Compte</span>
              </Link>
            )}
            <Link to="/cart" style={styles.iconLink}>
              <ShoppingCart size={20} />
              <span style={styles.iconLabel}>
                Panier{itemCount > 0 ? ` (${itemCount})` : ""}
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div style={styles.catBar}>
        <div className="container" style={styles.catInner}>
          <Link to="/" style={styles.catLink}>Tous les objets</Link>
          {categories.map((c) => (
            <Link key={c} to={`/?category=${encodeURIComponent(c)}`} style={styles.catLink}>
              {c}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

const styles = {
  topBar: { background: "var(--navy)", borderBottom: "1px solid var(--navy-light)" },
  topInner: { display: "flex", alignItems: "center", gap: 24, height: 76 },
  logo: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: "1.2rem",
    color: "var(--paper)",
    flexShrink: 0,
  },
  search: { flex: 1, maxWidth: 480, borderRadius: 20, border: "none", padding: "10px 18px" },
  iconsRow: { display: "flex", alignItems: "center", gap: 22, marginLeft: "auto" },
  iconLink: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    background: "none",
    color: "var(--paper)",
    fontSize: "0.7rem",
    fontWeight: 500,
  },
  iconLabel: { whiteSpace: "nowrap" },
  catBar: { background: "var(--blue)" },
  catInner: { display: "flex", alignItems: "center", gap: 28, height: 46, overflowX: "auto" },
  catLink: { fontSize: "0.85rem", fontWeight: 600, color: "var(--paper)", whiteSpace: "nowrap" },
};
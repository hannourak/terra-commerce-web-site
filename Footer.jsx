import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.grid}>
        <div style={styles.brandCol}>
          <h3 style={styles.logo}>Terra</h3>
          <p style={styles.tagline}>
            Des objets qui durent, pas seulement qui plaisent. Céramique, textile
            et lumière pour un quotidien plus simple.
          </p>
        </div>

        <div style={styles.col}>
          <h4 style={styles.colTitle}>Boutique</h4>
          <Link to="/" style={styles.link}>Tous les objets</Link>
          <Link to="/" style={styles.link}>Céramique</Link>
          <Link to="/" style={styles.link}>Textile</Link>
          <Link to="/" style={styles.link}>Luminaire</Link>
        </div>

        <div style={styles.col}>
          <h4 style={styles.colTitle}>Compte</h4>
          <Link to="/login" style={styles.link}>Connexion</Link>
          <Link to="/register" style={styles.link}>Créer un compte</Link>
          <Link to="/cart" style={styles.link}>Panier</Link>
        </div>

        <div style={styles.col}>
          <h4 style={styles.colTitle}>Contact</h4>
          <a href="mailto:contact@terra-objets.tn" style={styles.link}>
            contact@terra-objets.tn
          </a>
          <a href="tel:+21600000000" style={styles.link}>+216 00 000 000</a>
          <div style={styles.social}>
            <a href="#" aria-label="Instagram" style={styles.socialBtn}>IG</a>
            <a href="#" aria-label="Facebook" style={styles.socialBtn}>FB</a>
            <a href="#" aria-label="Pinterest" style={styles.socialBtn}>PT</a>
          </div>
        </div>
      </div>

      <div style={styles.bottomBar}>
        <div className="container" style={styles.bottomInner}>
          <span>© {new Date().getFullYear()} Terra. Tous droits réservés.</span>
          <span>Fait avec soin à Tunis.</span>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "var(--ink)",
    color: "var(--paper)",
    borderTop: "3px solid var(--cobalt)",
    marginTop: 80,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
    gap: 40,
    padding: "64px 24px 48px",
  },
  brandCol: { maxWidth: 320 },
  logo: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "1.5rem",
    color: "var(--paper)",
    marginBottom: 12,
  },
  tagline: { fontSize: "0.9rem", color: "var(--sand)", lineHeight: 1.6 },
  col: { display: "flex", flexDirection: "column", gap: 12 },
  colTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "0.85rem",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: "var(--paper)",
    marginBottom: 4,
  },
  link: { fontSize: "0.9rem", color: "var(--sand)" },
  social: { display: "flex", gap: 10, marginTop: 8 },
  socialBtn: {
    width: 34,
    height: 34,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid var(--sand)",
    fontSize: "0.7rem",
    fontWeight: 700,
    color: "var(--sand)",
  },
  bottomBar: { borderTop: "1px solid rgba(245,243,239,0.15)" },
  bottomInner: {
    padding: "20px 24px",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 8,
    fontSize: "0.8rem",
    color: "var(--sand)",
  },
};
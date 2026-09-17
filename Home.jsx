import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

const CATEGORIES = ["Tout", "Cuisine", "Textile", "Céramique", "Luminaire"];
const POPULAR = ["Cuisine", "Textile", "Céramique", "Luminaire"];

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const category = searchParams.get("category") || "Tout";
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const setCategory = (c) => {
    if (c === "Tout") {
      setSearchParams({});
    } else {
      setSearchParams({ category: c });
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {};
        if (category !== "Tout") params.category = category;
        if (search) params.search = search;
        const { data } = await api.get("/products", { params });
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, search]);

  return (
    <div>
      <section style={styles.hero}>
        <div className="container" style={styles.heroInner}>
          <div style={styles.badge}>
            <span style={styles.badgeEyebrow}>NOUVELLE</span>
            <span style={styles.badgePercent}>COLLECTION</span>
            <span style={styles.badgeSub}>Objets pour la maison</span>
            <Link to="/" style={styles.badgeBtn}>J'en profite ›</Link>
          </div>
          <div style={styles.heroText}>
            <p style={styles.heroEyebrow}>ALORS, VOUS VENEZ ?</p>
            <h1 style={styles.heroTitle}>
              Des objets qui durent,<br />pas seulement qui plaisent.
            </h1>
            <p style={styles.heroSub}>
              Céramique, textile et lumière pensés pour un quotidien plus simple.
            </p>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: "40px 24px" }}>
        <h2 style={styles.popularTitle}>UNIVERS POPULAIRES</h2>
        <div style={styles.popularRow}>
          {POPULAR.map((c) => (
            <button key={c} onClick={() => setCategory(c)} style={styles.popularItem}>
              <div style={styles.popularIcon}>{c[0]}</div>
              <span>{c}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="container" style={{ paddingBottom: 80 }}>
        <div style={styles.filterBar}>
          <div style={styles.categories}>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                style={{
                  ...styles.categoryBtn,
                  borderBottom: category === c ? "3px solid var(--blue)" : "3px solid transparent",
                  background: "none",
                  fontWeight: category === c ? 700 : 500,
                  color: category === c ? "var(--blue)" : "var(--ink)",
                }}
              >
                {c}
              </button>
            ))}
          </div>
          <input
            placeholder="Rechercher un objet..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.search}
          />
        </div>

        {loading ? (
          <p style={{ padding: "40px 0" }}>Chargement...</p>
        ) : products.length === 0 ? (
          <p style={{ padding: "40px 0" }}>Aucun objet ne correspond à cette recherche.</p>
        ) : (
          <div style={styles.grid}>
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

const styles = {
  hero: { background: "var(--yellow)" },
  heroInner: { display: "flex", alignItems: "center", gap: 48, padding: "48px 24px", flexWrap: "wrap" },
  badge: {
    background: "var(--blue)",
    color: "var(--paper)",
    borderRadius: "50%",
    width: 220,
    height: 220,
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: 4,
    padding: 16,
  },
  badgeEyebrow: { fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.05em" },
  badgePercent: { fontSize: "1.3rem", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" },
  badgeSub: { fontSize: "0.7rem", opacity: 0.9 },
  badgeBtn: {
    marginTop: 8,
    background: "var(--paper)",
    color: "var(--navy)",
    fontSize: "0.7rem",
    fontWeight: 700,
    padding: "6px 14px",
    borderRadius: 14,
  },
  heroText: { flex: 1, minWidth: 260 },
  heroEyebrow: { fontSize: "0.85rem", fontWeight: 700, color: "var(--navy)", marginBottom: 8 },
  heroTitle: {
    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
    maxWidth: 620,
    marginBottom: 12,
    color: "var(--navy)",
  },
  heroSub: { fontSize: "1rem", maxWidth: 460, color: "var(--navy)", opacity: 0.85 },
  popularTitle: {
    fontSize: "0.85rem",
    fontWeight: 700,
    letterSpacing: "0.05em",
    color: "var(--ink)",
    marginBottom: 20,
    textAlign: "center",
  },
  popularRow: { display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" },
  popularItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    background: "none",
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "var(--ink)",
  },
  popularIcon: {
    width: 72,
    height: 72,
    borderRadius: "50%",
    background: "var(--sand)",
    border: "1px solid var(--line)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: "1.4rem",
    color: "var(--blue)",
  },
  filterBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
    padding: "40px 0 32px",
    borderTop: "1px solid var(--line)",
  },
  categories: { display: "flex", gap: 20 },
  categoryBtn: { padding: "4px 0", fontSize: "0.95rem" },
  search: { maxWidth: 240 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 32,
  },
};
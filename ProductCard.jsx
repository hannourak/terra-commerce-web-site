import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} style={styles.card}>
      <div style={styles.imageWrap}>
        <img src={product.image} alt={product.name} style={styles.image} />
      </div>
      <div style={styles.info}>
        <h3 style={styles.name}>{product.name}</h3>
        <p style={styles.price}>{product.price.toFixed(2)} DT</p>
      </div>
    </Link>
  );
}

const styles = {
  card: { display: "block" },
  imageWrap: {
    aspectRatio: "4 / 5",
    overflow: "hidden",
    background: "var(--sand)",
    border: "2px solid var(--ink)",
  },
  image: { width: "100%", height: "100%", objectFit: "cover" },
  info: { paddingTop: 14 },
  name: { fontSize: "1rem", fontWeight: 500, marginBottom: 4 },
  price: {
    fontSize: "1rem",
    fontWeight: 700,
    fontFamily: "'Space Grotesk', sans-serif",
    color: "var(--ink)",
  },
};
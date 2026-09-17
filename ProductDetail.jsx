import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    api.get(`/products/${id}`).then(({ data }) => setProduct(data));
  }, [id]);

  if (!product) return <div className="container" style={{ padding: 60 }}>Chargement...</div>;

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="container" style={styles.wrap}>
      <div style={styles.imageWrap}>
        <img src={product.image} alt={product.name} style={styles.image} />
      </div>

      <div style={styles.details}>
        <p style={styles.category}>{product.category}</p>
        <h1 style={styles.name}>{product.name}</h1>
        <p style={styles.price}>{product.price.toFixed(2)} DT</p>
        <p style={styles.description}>{product.description}</p>

        <div style={styles.qtyRow}>
          <label htmlFor="qty" style={{ fontSize: "0.9rem" }}>Quantité</label>
          <input
            id="qty"
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            style={{ width: 70 }}
          />
          <span style={{ fontSize: "0.85rem", color: "var(--ink)" }}>
            {product.stock} en stock
          </span>
        </div>

        <button
          className="btn btn-primary"
          onClick={handleAdd}
          disabled={product.stock === 0}
          style={{ marginTop: 16, width: "100%" }}
        >
          {product.stock === 0 ? "Rupture de stock" : added ? "Ajouté ✓" : "Ajouter au panier"}
        </button>

        <button
          onClick={() => navigate("/cart")}
          className="btn btn-outline"
          style={{ marginTop: 12, width: "100%" }}
        >
          Voir le panier
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrap: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 64,
    padding: "56px 24px",
    alignItems: "start",
  },
  imageWrap: {
    aspectRatio: "4 / 5",
    background: "var(--sand)",
    border: "2px solid var(--ink)",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  details: {
    maxWidth: 420,
  },
  category: {
    fontSize: "0.85rem",
    color: "var(--ink)",
    marginBottom: 8,
  },
  name: {
    fontSize: "2rem",
    marginBottom: 12,
  },
  price: {
    fontSize: "1.25rem",
    marginBottom: 20,
  },
  description: {
    color: "var(--ink)",
    opacity: 0.85,
    marginBottom: 24,
  },
  qtyRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
};

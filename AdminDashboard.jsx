import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import api from "../api/axios";

const emptyForm = { name: "", description: "", price: "", category: "", image: "", stock: "" };

export default function AdminDashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const fetchProducts = async () => {
    const { data } = await api.get("/products");
    setProducts(data);
  };

  useEffect(() => {
    if (user?.role === "admin") fetchProducts();
  }, [user]);

  if (!user || user.role !== "admin") return <Navigate to="/" replace />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
    if (editingId) {
      await api.put(`/products/${editingId}`, payload);
    } else {
      await api.post("/products", payload);
    }
    setForm(emptyForm);
    setEditingId(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      stock: product.stock,
    });
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Supprimer cet objet ?")) return;
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="container" style={{ padding: "48px 24px" }}>
      <h1 style={{ marginBottom: 32 }}>Tableau de bord — Produits</h1>

      <div style={styles.grid}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={{ fontSize: "1.1rem", marginBottom: 16 }}>
            {editingId ? "Modifier l'objet" : "Ajouter un objet"}
          </h2>

          <div style={styles.field}>
            <label>Nom</label>
            <input name="name" required value={form.name} onChange={handleChange} />
          </div>
          <div style={styles.field}>
            <label>Description</label>
            <textarea name="description" required rows={3} value={form.description} onChange={handleChange} />
          </div>
          <div style={styles.row}>
            <div style={styles.field}>
              <label>Prix (DT)</label>
              <input name="price" type="number" step="0.01" required value={form.price} onChange={handleChange} />
            </div>
            <div style={styles.field}>
              <label>Stock</label>
              <input name="stock" type="number" required value={form.stock} onChange={handleChange} />
            </div>
          </div>
          <div style={styles.field}>
            <label>Catégorie</label>
            <select name="category" required value={form.category} onChange={handleChange}>
              <option value="">Choisir...</option>
              <option value="Cuisine">Cuisine</option>
              <option value="Textile">Textile</option>
              <option value="Céramique">Céramique</option>
              <option value="Luminaire">Luminaire</option>
            </select>
          </div>
          <div style={styles.field}>
            <label>URL de l'image</label>
            <input name="image" required value={form.image} onChange={handleChange} />
          </div>

          <button className="btn btn-primary" style={{ width: "100%", marginTop: 8 }}>
            {editingId ? "Enregistrer les modifications" : "Ajouter le produit"}
          </button>
          {editingId && (
            <button
              type="button"
              className="btn btn-outline"
              style={{ width: "100%", marginTop: 8 }}
              onClick={() => { setForm(emptyForm); setEditingId(null); }}
            >
              Annuler
            </button>
          )}
        </form>

        <div>
          <h2 style={{ fontSize: "1.1rem", marginBottom: 16 }}>Produits ({products.length})</h2>
          <div style={styles.list}>
            {products.map((p) => (
              <div key={p.id} style={styles.item}>
                <img src={p.image} alt={p.name} style={styles.thumb} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 500 }}>{p.name}</p>
                  <p style={{ fontSize: "0.85rem", color: "var(--ink)" }}>
                    {p.price.toFixed(2)} DT — {p.stock} en stock
                  </p>
                </div>
                <button onClick={() => handleEdit(p)} style={styles.actionBtn}>Modifier</button>
                <button onClick={() => handleDelete(p.id)} style={{ ...styles.actionBtn, color: "var(--flame)" }}>
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "360px 1fr",
    gap: 48,
    alignItems: "start",
  },
  form: {
    background: "var(--sand)",
    border: "2px solid var(--ink)",
    padding: 24,
  },
  field: {
    marginBottom: 14,
    display: "flex",
    flexDirection: "column",
    gap: 6,
    flex: 1,
  },
  row: {
    display: "flex",
    gap: 12,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    border: "2px solid var(--ink)",
    padding: 12,
    background: "var(--sand)",
  },
  thumb: {
    width: 56,
    height: 56,
    objectFit: "cover",
  },
  actionBtn: {
    background: "none",
    fontSize: "0.85rem",
    textDecoration: "underline",
  },
};

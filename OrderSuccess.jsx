import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="container" style={{ padding: "96px 24px", textAlign: "center" }}>
      <h1 style={{ marginBottom: 16 }}>Commande confirmée</h1>
      <p style={{ color: "var(--ink)", marginBottom: 32 }}>
        Merci pour votre commande. Vous recevrez un appel de confirmation sous peu.
      </p>
      <Link to="/" className="btn btn-primary">Retour à la boutique</Link>
    </div>
  );
}

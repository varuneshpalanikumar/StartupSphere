function UserInfoModal({ user, onClose }) {
  if (!user) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000
      }}
    >
      <div
        className="card"
        style={{
          width: "90%",
          maxWidth: "500px",
          position: "relative"
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            border: "none",
            background: "transparent",
            fontSize: "20px",
            cursor: "pointer"
          }}
        >
          ×
        </button>

        <h2 style={{ marginBottom: "10px" }}>
          {user.name}
          {user.verified && (
            <span className="verified-badge">✔ Verified</span>
          )}
        </h2>

        <p className="muted" style={{ marginBottom: "14px" }}>
          {user.role}
        </p>

        <p>
          <strong>Email:</strong> {user.email || "Not available"}
        </p>

        {user.skills && user.skills.length > 0 && (
          <p style={{ marginTop: "10px" }}>
            <strong>Skills:</strong> {user.skills.join(", ")}
          </p>
        )}

        {user.portfolio && (
          <p style={{ marginTop: "10px" }}>
            <strong>Portfolio:</strong>{" "}
            <a href={user.portfolio} target="_blank" rel="noreferrer">
              View
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default UserInfoModal;
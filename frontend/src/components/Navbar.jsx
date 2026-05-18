import { useState } from "react";

function Navbar({ userLabel = "User", onLogout }) {
  const [open, setOpen] = useState(false);
  const initials = userLabel.trim().charAt(0).toUpperCase() || "U";

  return (
    <header className="app-navbar">
      <div className="brand">
        <span className="brand-mark">T</span>
        <div>
          <p className="brand-name">Task Manager</p>
          <p className="brand-subtitle">Smart task tracking</p>
        </div>
      </div>

      <div className="profile-menu">
        <button
          type="button"
          className="profile-button"
          onClick={() => setOpen((current) => !current)}
        >
          <span className="profile-avatar">{initials}</span>
          <span className="profile-user">{userLabel}</span>
        </button>

        {open && (
          <div className="profile-dropdown">
            <div className="profile-summary">
              <span className="profile-avatar profile-avatar--small">{initials}</span>
              <div>
                <p>{userLabel}</p>
                <p className="profile-status">Logged in</p>
              </div>
            </div>
            <button className="logout-button" type="button" onClick={onLogout}>
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;

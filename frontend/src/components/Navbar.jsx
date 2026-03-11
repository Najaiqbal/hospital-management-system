function Navbar({ setPage, user, setUser }) {

  const logout = () => {
    setUser(null);
    setPage("login");
  };

  return (

    <div className="navbar">

      <h2>Hospital Management System</h2>

      <div>

        {!user && (
          <>
            <button onClick={() => setPage("login")}>Login</button>
            <button onClick={() => setPage("register")}>Register</button>
          </>
        )}

        {user && (
          <button onClick={logout}>Logout</button>
        )}

      </div>

    </div>

  );
}

export default Navbar;
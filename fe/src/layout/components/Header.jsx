import { useNavigate } from "react-router";

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      sessionStorage.removeItem("token");
      setUser(null);
      navigate("/login");
    }
  };

  return (
    <div className="header-container">
      <div className="header-title">TODO</div>
      <button className="header-login-btn" onClick={handleClick}>
        {user ? "로그아웃" : "로그인"}
      </button>
    </div>
  );
};

export default Header;

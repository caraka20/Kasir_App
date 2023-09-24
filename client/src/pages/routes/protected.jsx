import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./protected.css";

export default function Protected({ children, adminPage, kasirPage }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(localStorage.getItem("role"));
  console.log(user);

  const nav = useNavigate();

  useEffect(() => {
    if (user === "admin" && kasirPage)
      return (
        setTimeout(() => {
          setLoading(false);
        }, 1000),
        nav("/home/admin")
      );
    if (user === "cashier" && adminPage)
      return (
        setTimeout(() => {
          setLoading(false);
        }, 1000),
        nav("/cashier")
      );

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [children]);

  return (
    <>
      {loading ? (
        <>
Loading...
        </>
      ) : (
        children
      )}
    </>
  );
}
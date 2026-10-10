import { ShieldCheck } from "lucide-react";
import logo from "../assets/logo.svg";

function Navbar() {
  return (
    <div
      style={{
        height: "72px",
        background: "#07111f",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        color: "white"
      }}
    >
      <img
        src={logo}
        alt="SecureBank"
        style={{
          width: "160px",
          filter: "brightness(0) invert(1)"
        }}
      />

      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "12px",
          color: "#93c5fd"
        }}
      >
        <ShieldCheck size={16} />
        Enterprise Security
      </div>
    </div>
  );
}

export default Navbar;
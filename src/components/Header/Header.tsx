"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Header.module.scss";
import logo from "@/assets/logo.png";
import { UserCircle2 } from "lucide-react";
import DialogLogIn from "../Login/Login";

function Header() {
  const [showDialog, setShowDialog] = useState(false);

  const handleOpenDialog = () => {
    setShowDialog(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    document.body.style.overflow = "unset";
  };

  return (
    <div className={styles.header}>
      <Image
        src={logo}
        alt="Logo do Instituto Patinhas"
        className={styles.logo}
      />
      <Navbar />
      <UserCircle2 className={styles.iconeUsuario} onClick={handleOpenDialog} />
      {showDialog && (
        <div onClick={handleCloseDialog} className={styles.modalOverlay}>
          <div onClick={(e) => e.stopPropagation()}>
            <DialogLogIn />
          </div>
        </div>
      )}
    </div>
  );
}

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.item}>Censo</div>
      <div className={styles.divisor} />
      <div className={styles.item}>Gráficos</div>
      <div className={styles.divisor} />
      <div className={styles.item}>Protetores</div>
    </nav>
  );
}

export default Header;

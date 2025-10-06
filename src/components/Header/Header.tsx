"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";
import { UserCircle2, Cat } from "lucide-react";
import DialogLogIn from "../Auth/Auth";
import { UserContext } from "@/providers/UserContext";

function Header() {
  const [showDialog, setShowDialog] = useState(false);
  const { user, isProtetor } = useContext(UserContext);

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
      <Link href="/" className={styles.logoLink}>
        <div className={styles.logo}>
          <Cat size={40} />
          <span>Patinhas do Instituto</span>
        </div>
      </Link>
      <Navbar isProtetor={isProtetor} />
      <UserCircle2 className={styles.iconeUsuario} onClick={handleOpenDialog} />
      {showDialog && (
        <div onClick={handleCloseDialog} className={styles.modalOverlay}>
          <div onClick={(e) => e.stopPropagation()}>
            <DialogLogIn closeDialog={handleCloseDialog} />
          </div>
        </div>
      )}
    </div>
  );
}

function Navbar({ isProtetor }: { isProtetor: boolean }) {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.item}>
        Censo
      </Link>
      <div className={styles.divisor} />
      <Link href="/graficos" className={styles.item}>
        Gráficos
      </Link>
      <div className={styles.divisor} />
      <Link href="/protetores" className={styles.item}>
        Protetores
      </Link>
    </nav>
  );
}

export default Header;

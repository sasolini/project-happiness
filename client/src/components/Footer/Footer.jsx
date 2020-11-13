import React from "react";

import S from "./Footer.module.scss";

const Footer = () => (
  <footer className={S.footerWrapper}>
    <div className={S.mainFooter}>
      <p className={S.copyright}>
        Created by <a href="https://sasho.dev">Sasho</a>
      </p>
    </div>
  </footer>
);

export default Footer;

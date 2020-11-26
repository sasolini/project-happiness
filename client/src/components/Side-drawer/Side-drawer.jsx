import React from "react";
import PropTypes from "prop-types";
import { logOutAsync } from "./Side-drawerAPI";

import { ReactComponent as LogOutIcon } from "./assets/logout.svg";
import { ReactComponent as CloseIcon } from "./assets/cancel.svg";

import S from "./Side-drawer.module.scss";

const SideDrawer = ({ close, logout }) => {
  const logOutHandler = (option) => {
    logOutAsync(option).then((res) => {
      logout();
    });
  };

  return (
    <div className={S.drawer}>
      <button onClick={close} className={S.closeBtn}>
        <CloseIcon className={S.icon} />
      </button>
      <div className={S.options}>
        <div
          onClick={() => logOutHandler("logout")}
          className={S.optionsItem}
          data-option="logOut"
        >
          <LogOutIcon className={S.icon} />
          <p>Log out</p>
        </div>
        <div
          onClick={() => logOutHandler("logoutall")}
          className={`${S.optionsItem} ${S.danger}`}
          data-option="logOutAll"
        >
          <LogOutIcon className={S.icon} />
          <p>Log out all</p>
        </div>
      </div>
    </div>
  );
};

SideDrawer.propTypes = {
  close: PropTypes.func.isRequired,
};

export default SideDrawer;

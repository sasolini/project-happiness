import React from "react";
import PropTypes from "prop-types";
import { logOutAsync, deleteUserAsync } from "./Side-drawerAPI";

import { ReactComponent as LogOutIcon } from "./assets/logout.svg";
import { ReactComponent as CloseIcon } from "./assets/cancel.svg";
import { ReactComponent as TrashIcon } from "./assets/trash.svg";

import S from "./Side-drawer.module.scss";

const SideDrawer = ({ close, logout }) => {
  const logOutHandler = (option) => {
    logOutAsync(option).then((res) => {
      logout();
    });
  };

  const deleteAccHandler = () => {
    deleteUserAsync().then((res) => {
      logout();
      console.log("Account deleted");
    });
  };

  return (
    <div className={S.drawer}>
      <button onClick={close} className={S.closeBtn}>
        <CloseIcon className={S.icon} />
      </button>
      <div className={S.options}>
        <div className={S.group1}>
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
        <div
          onClick={() => deleteAccHandler()}
          className={`${S.optionsItem} ${S.danger}`}
        >
          <TrashIcon className={S.icon} />
          <p>Delete account</p>
        </div>
      </div>
    </div>
  );
};

SideDrawer.propTypes = {
  close: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default SideDrawer;

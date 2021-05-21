import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import EditableText from "../../EditableText";
const FooterNav = ({ className, ...props }) => {
  const classes = classNames("footer-nav", className);

  return (
    <nav {...props} className={classes}>
      <ul className="list-reset">
        <li>
          <EditableText fSize="14" text="Contact" />
        </li>
        <li>
          <Link to="#0">
            <EditableText fSize="14" text="About us" />
          </Link>
        </li>
        <li>
          <Link to="#0">
            <EditableText fSize="14" text="FAQ's" />
          </Link>
        </li>
        <li>
          <Link to="#0">
            <EditableText fSize="14" text="Support" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default FooterNav;

import React from "react";
import styles from "../../styles/Admin.module.css";

const Filters = ({ items, defaultDescription, handleFilter }) => {
  return (
    <div className={styles.select}>
      <select name={{ defaultDescription }} onChange={(e) => handleFilter(e.target.value)}>
        <option value="default">{defaultDescription}</option>
        {items?.map((item) => {
          return (
            <option key={item.id} value={item.status}>
              {item.status}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Filters;
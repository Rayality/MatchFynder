import React from "react";
import "../../App.css";

export const BadgeCard = () => {
  return (
    <div className={`badge-card `}>
      <div className="overlap">
        <div className="PIC">PIC</div>
      </div>
      <div className="username">Username</div>
      <div className="overlap-group">
        <div className="badge-award">Badge award</div>
      </div>
    </div>
  );
};

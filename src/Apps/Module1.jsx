import { useState } from "react";
import css from "./Module1.module.css";
import userData from "../data/userData.json";
import Profile from "../components/Profile/Profile";
import friends from "../data/friends.json";
import FriendList from "../components/FriendList/FriendList";
import transactions from "../data/transactions.json";
import TransactionHistory from "../components/TransactionHistory/TransactionHistory";

const Module1 = () => {
  return (
    <div className={css.Module1}>
      <Profile
        name={userData.username}
        tag={userData.tag}
        location={userData.location}
        image={userData.avatar}
        stats={userData.stats}
      />
      <FriendList friends={friends} />
      <TransactionHistory items={transactions} />
    </div>
  );
};

export default Module1;

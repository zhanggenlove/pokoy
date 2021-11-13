import { useState, useEffect } from "react";
import { User } from "@firebase/auth";
import { getUserStats } from "./getUserStats";

export const Total = ({ user }: { user: User }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getUserStats(user).then((stats) => {
      if (!stats) return;
      setTotal(stats.totalDuration);
    });
  }, [user]);

  return <span style={{ color: "gray", fontSize: "xx-small" }}>{total}</span>;
};

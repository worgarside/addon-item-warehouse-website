"use client";

import React, { useEffect, useState } from "react";
import { getWarehouses } from "@/services/api";
import styles from "../styles/Sidebar.module.css";
import Link from "next/link";
import Icon from "@mdi/react";
import { mdiWarehouse } from "@mdi/js";

interface Warehouse {
  name: string;
}

const Sidebar: React.FC = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  useEffect(() => {
    getWarehouses()
      .then((warehouses) => {
        setWarehouses(warehouses);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={styles.sidebar}>
      <h2 className={`text-center my-1 fw-bold ${styles.header}`}>
        Warehouses
      </h2>
      <div className="list-group">
        {warehouses.map((warehouse: Warehouse) => (
          <Link
            key={warehouse.name}
            className="list-group-item text-decoration-none"
            href={`/warehouse/${encodeURIComponent(warehouse.name)}`}
          >
            <Icon className="me-2" path={mdiWarehouse} size={1} />
            {warehouse.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
export const dynamic = "force-dynamic";

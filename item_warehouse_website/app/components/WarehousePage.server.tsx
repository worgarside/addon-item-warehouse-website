import React from "react";
import Warehouse from "./Warehouse.server";
import PageSizeDropdown from "./PageSizeDropdown.client";
import {
  ItemsResponse,
  WarehouseType,
  getItemsFromWarehouse,
  getWarehouse,
} from "../services/api";
import { cookies } from "next/headers";

import Paginator from "./Paginator.client";

const WarehousePage: React.FC<{
  warehouseName: string;
  page: string;
}> = async ({ warehouseName, page }) => {
  const pageSize = cookies().get("pageSize")?.value || "10";

  let item_page: ItemsResponse;
  let warehouse: WarehouseType;

  try {
    warehouse = await getWarehouse(warehouseName);
    item_page = await getItemsFromWarehouse(warehouseName, pageSize, page);
  } catch (error) {
    return (
      <div className="alert alert-warning" role="alert">
        <h1>TODO: Error Page :(</h1>
        <pre>
          <code>{JSON.stringify(error, null, 2)}</code>
        </pre>
      </div>
    );
  }

  const fields = Object.keys(warehouse.item_schema);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <h1 className="mb-0 mt-auto">{warehouseName}</h1>
              <span className="mb-1 mt-auto ms-3 text-muted">
                Viewing {item_page.count} of {item_page.total}{" "}
                {warehouse.item_name}s
              </span>
            </ul>
            <Paginator
              currentPage={item_page.page}
              totalPages={Math.ceil(item_page.total / parseInt(pageSize))}
              warehouseName={warehouseName}
            />
            <PageSizeDropdown
              currentPageSize={pageSize}
              warehouseName={warehouseName}
            />
          </div>
        </div>
      </nav>
      <Warehouse
        items={item_page.items}
        fields={fields}
        warehouseName={warehouseName}
        currentPage={item_page.page}
      />
    </>
  );
};

export default WarehousePage;
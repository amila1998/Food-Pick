"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

interface Column {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode;
}

interface Action {
  label: string;
  icon: React.ReactNode;
  onClick: (row: any) => void;
  permissionDenied?: (row: any) => boolean;
}

interface TableProps {
  columns: Column[];
  data: any[];
  actions?: Action[];
  page: number;
  rowsPerPage: number;
  total: number;
  title?: React.ReactNode;
  onPageChange: (page: number) => void;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  title,
  actions = [],
  page,
  rowsPerPage,
  total,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / rowsPerPage);

  const renderPageNumbers = () => {
    const visiblePages: (string | number)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) visiblePages.push(i);
    } else {
      visiblePages.push(1);
      if (page > 3) visiblePages.push("...");
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      for (let i = start; i <= end; i++) visiblePages.push(i);
      if (page < totalPages - 2) visiblePages.push("...");
      visiblePages.push(totalPages);
    }

    return visiblePages.map((p, i) =>
      typeof p === "string" ? (
        <span key={i} className="px-2 text-gray-400">
          {p}
        </span>
      ) : (
        <button
          key={i}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 text-sm rounded transition-all duration-150 ${
            p === page
              ? "bg-primary text-white font-semibold"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {p}
        </button>
      )
    );
  };

  return (
    <div className="w-full mt-4 overflow-hidden">
      {title && <div className="mb-3">{title}</div>}

      <div className="rounded-xl overflow-hidden ">
        <div className="overflow-x-auto">
          <motion.table
            className="min-w-full text-sm text-left bg-body_light dark:bg-body_dark text-black dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <thead className="text-xs uppercase bg-body_light dark:bg-body_dark text-black dark:text-white sticky top-0 z-10">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="px-6 py-4 whitespace-nowrap">
                    {col.label}
                  </th>
                ))}
                {actions.length > 0 && <th className="px-6 py-4 whitespace-nowrap">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <motion.tr
                  key={i}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td className="px-6 py-4 space-x-2 flex items-center">
                      {actions.map((action, idx) => (
                        action.permissionDenied?.(row) === false ? null : (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            key={idx}
                            onClick={() => action.onClick(row)}
                            title={action.label}
                            className="text-sm text-primary cursor-pointer transition-all"
                          >
                            {action.icon}
                          </motion.div>
                        )
                      ))}
                    </td>
                  )}
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center flex-wrap mt-4 text-sm gap-2">
        <p className="text-gray-600 dark:text-gray-400">
          Showing page {page} of {totalPages}
        </p>
        <div className="flex items-center gap-1 flex-wrap">
          <button
            onClick={() => onPageChange(1)}
            disabled={page === 1}
            className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
          >
            First
          </button>
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
          >
            Prev
          </button>

          {renderPageNumbers()}

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
          >
            Next
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={page === totalPages}
            className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;

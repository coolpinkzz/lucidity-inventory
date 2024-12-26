import React from "react";

const TableSkeleton = ({
  rows = 5,
  columns = 5,
}: {
  rows?: number;
  columns?: number;
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, index) => (
              <th key={index} className="px-4 py-2 bg-gray-100 border">
                <div className="w-24 h-4 bg-gray-300 animate-pulse rounded"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="px-4 py-2 border">
                  <div className="w-full h-6 bg-gray-300 animate-pulse rounded"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;

import mysql from 'mysql2';

export function getOffset(currentPage = 1, listPerPage: number) {
  return (currentPage - 1) * listPerPage;
}

export function emptyOrRows(rows: mysql.RowDataPacket) {
  if (!rows) {
    return [];
  }
  return rows;
}
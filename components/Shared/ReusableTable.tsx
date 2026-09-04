"use client";

import { faBoxesPacking, faInbox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EmptyState, Spinner, Table } from "@heroui/react";
import { Pagination } from "@heroui/react";

// Definisi tiap kolom
export interface ColumnDef<T> {
  key: string; // unique key untuk kolom
  label: string; // teks header
  className?: string; // class tambahan untuk <th>
  cellClassName?: string; // class tambahan untuk <td>
  renderCell?: (row: T) => React.ReactNode; // custom renderer; jika tidak ada, pakai row[key]
  minWidth?: number;
}

export interface PaginationConfig {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  start: number;
  end: number;
  itemLabel?: string;
  pages: (number | string)[];
  onPageChange: (page: number) => void;
}

interface ReusableTableProps<T extends object> {
  columns: ColumnDef<T>[];
  data: T[];
  pagination?: PaginationConfig;
  emptyMessage: string;
  isLoading?: boolean;
}

export function ReusableTable<T extends object>({
  columns,
  data,
  pagination,
  emptyMessage,
  isLoading = false,
}: ReusableTableProps<T>) {
  const rows = isLoading ? [] : data;
  return (
    <Table aria-label="Table" className="rounded-none p-0 min-h-[200px]">
      <Table.ResizableContainer>
        <Table.Content
          className="min-w-[700px] h-full"
          aria-label="table content"
        >
          {/* Header */}
          <Table.Header
            className={"bg-surface-secondary border border-surface-border"}
          >
            {columns.map((col, i) => (
              <Table.Column
                isRowHeader={i === 0}
                key={col.key}
                className={"font-semibold text-black text-sm"}
                minWidth={col.minWidth || 120}
              >
                {col.label}
                {i !== columns.length - 1 && <Table.ColumnResizer />}
              </Table.Column>
            ))}
          </Table.Header>

          {/* Body */}
          <Table.Body
            renderEmptyState={() =>
              isLoading ? (
                <EmptyState className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
                  <Spinner size="lg" />
                  <span className="text-sm text-muted">Memuat data...</span>
                </EmptyState>
              ) : (
                <EmptyState className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
                  <FontAwesomeIcon
                    icon={faBoxesPacking}
                    size="2xl"
                    className="text-muted size-6"
                  />
                  <span className="text-sm text-muted">{emptyMessage}</span>
                </EmptyState>
              )
            }
          >
            {rows.map((row, rowIndex) => (
              <Table.Row
                key={rowIndex}
                className={
                  "*:bg-surface-tertiary hover:*:bg-surface-secondary *:border-y *:border-surface-border"
                }
              >
                {columns.map((col) => (
                  <Table.Cell key={col.key} className={"rounded-none"}>
                    {col.renderCell
                      ? col.renderCell(row)
                      : String(
                          (row as Record<string, unknown>)[col.key] ?? "-",
                        )}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ResizableContainer>
      {pagination && (
        <Table.Footer className="bg-surface-secondary border-t">
          <Pagination size="sm" aria-label="Navigasi Tabel">
            <Pagination.Summary className="text-black">
              Manampilkan {pagination.start} - {pagination.end} dari{" "}
              {pagination.totalItems} {pagination.itemLabel}
            </Pagination.Summary>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={pagination.currentPage === 1}
                  onPress={() =>
                    pagination.onPageChange(
                      Math.max(1, pagination.currentPage - 1),
                    )
                  }
                  className="bg-white rounded-md border border-slate-300"
                >
                  <Pagination.PreviousIcon />
                </Pagination.Previous>
              </Pagination.Item>
              {pagination.pages.map((p, index) => {
                if (p === "...") {
                  return (
                    <Pagination.Item key={`ellipsis-${index}`}>
                      <span className="px-3 py-1.5 text-slate-400 select-none text-sm font-normal">
                        ...
                      </span>
                    </Pagination.Item>
                  );
                }

                return (
                  <Pagination.Item key={`page-${p}`}>
                    <Pagination.Link
                      isActive={p === pagination.currentPage}
                      onPress={() => pagination.onPageChange(p as number)}
                      className="data-[active='true']:bg-primary data-[active='true']:text-primary-foreground data-[active='true']:font-semibold rounded-md border border-slate-300 bg-white text-foreground"
                    >
                      {p}
                    </Pagination.Link>
                  </Pagination.Item>
                );
              })}
              <Pagination.Item>
                <Pagination.Next
                  isDisabled={pagination.currentPage === pagination.totalPages}
                  onPress={() =>
                    pagination.onPageChange(
                      Math.min(
                        pagination.totalPages,
                        pagination.currentPage + 1,
                      ),
                    )
                  }
                  className="bg-white rounded-md border border-slate-300s"
                >
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </Table.Footer>
      )}
    </Table>
  );
}

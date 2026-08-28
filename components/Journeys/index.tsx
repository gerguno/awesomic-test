"use client";

import { useMemo, useState } from "react";
import cn from "classnames";
import Icon from "@/components/Icon";
import CardHeader from "@/components/CardHeader";
import { type JourneyColumnId, type JourneyRow } from "@/data";
import { type QuickAction } from "@/components/QuickActions";
import textStyles from "@/styles/typography.module.scss";
import styles from "./index.module.scss";

const ACTIONS: QuickAction[] = [
  { id: "move", icon: "drag", label: "Move card" },
  { id: "report", icon: "report", label: "Report" },
  { id: "more", icon: "more", label: "More" },
];

const COLUMNS: {
  id: JourneyColumnId;
  label: string;
  sort?: boolean;
  info?: boolean;
  accent?: "green";
  numeric?: boolean;
}[] = [
  { id: "name", label: "Journey", sort: true },
  { id: "sent", label: "Sent", sort: true, numeric: true },
  { id: "openRate", label: "Open rate", sort: true, accent: "green", numeric: true },
  { id: "clickRate", label: "Click rate", sort: true, numeric: true },
  { id: "revenue", label: "Revenue", sort: true, accent: "green", numeric: true },
  { id: "perThousand", label: "Per 1k", sort: true, numeric: true },
  { id: "change", label: "Change", info: true, numeric: true },
  { id: "bounceRate", label: "Bounced", info: true, numeric: true },
  { id: "conversionRate", label: "Conv. rate", info: true, numeric: true },
  { id: "averageOrder", label: "Avg. Order", info: true, numeric: true },
];

type Sort = { id: JourneyColumnId; dir: "asc" | "desc" };

const VALUE: Record<JourneyColumnId, (row: JourneyRow) => string | number> = {
  name: (row) => row.name,
  sent: (row) => row.sent,
  openRate: (row) => row.openRate,
  clickRate: (row) => row.clickRate,
  revenue: (row) => row.revenue,
  perThousand: (row) => row.perThousand,
  change: (row) => row.change.value,
  bounceRate: (row) => row.bounceRate,
  conversionRate: (row) => row.conversionRate,
  averageOrder: (row) => row.averageOrder,
};

const LABEL: Record<JourneyColumnId, (row: JourneyRow) => string> = {
  name: (row) => row.name,
  sent: (row) => row.sentLabel,
  openRate: (row) => row.openRateLabel,
  clickRate: (row) => row.clickRateLabel,
  revenue: (row) => row.revenueLabel,
  perThousand: (row) => row.perThousandLabel,
  change: (row) => row.changeLabel,
  bounceRate: (row) => row.bounceRateLabel,
  conversionRate: (row) => row.conversionRateLabel,
  averageOrder: (row) => row.averageOrderLabel,
};

export interface JourneysProps {
  rows: JourneyRow[];
  className?: string;
}

export default function Journeys({ rows, className }: JourneysProps) {
  const [sort, setSort] = useState<Sort | null>(null);

  const ordered = useMemo(() => {
    if (!sort) return rows;
    const copy = [...rows];
    copy.sort((a, b) => {
      const left = VALUE[sort.id](a);
      const right = VALUE[sort.id](b);
      const cmp =
        typeof left === "number" && typeof right === "number"
          ? left - right
          : String(left).localeCompare(String(right));
      return sort.dir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [rows, sort]);

  const toggle = (id: JourneyColumnId) => {
    setSort((current) => {
      if (current?.id !== id) return { id, dir: "desc" };
      if (current.dir === "desc") return { id, dir: "asc" };
      return null;
    });
  };

  return (
    <article className={cn(styles.root, className)}>
      <CardHeader title="Journeys" actions={ACTIONS} />
      <div className={styles.scroller}>
        <table className={styles.table}>
          <thead>
            <tr>
              {COLUMNS.map((column) => (
                <th
                  key={column.id}
                  className={cn(styles.head, textStyles.bodyMd)}
                  scope="col"
                >
                  {column.sort ? (
                    <button
                      type="button"
                      className={styles.item}
                      onClick={() => toggle(column.id)}
                    >
                      {column.label}
                      <Icon name="arrows" width={16} height={16} aria-hidden />
                    </button>
                  ) : (
                    <span className={styles.item}>
                      {column.label}
                      {column.info ? (
                        <Icon name="info" width={18} height={18} aria-hidden />
                      ) : null}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ordered.map((row) => (
              <tr key={row.id}>
                {COLUMNS.map((column) => (
                  <td
                    key={column.id}
                    className={cn(
                      styles.cell,
                      column.numeric ? textStyles.monoMd : textStyles.bodyMd,
                      column.accent === "green" && styles.green,
                    )}
                  >
                    <span className={styles.item}>{LABEL[column.id](row)}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

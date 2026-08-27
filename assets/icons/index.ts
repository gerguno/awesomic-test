import type { ComponentType } from "react";
import type { IconRenderProps } from "@/utils/createIcon";

import { PlusIcon } from "./Plus";
import { MinusIcon } from "./Minus";
import { ArrowsIcon } from "./Arrows";
import { ArrowTopRightIcon } from "./ArrowTopRight";
import { ArrowBottomRightIcon } from "./ArrowBottomRight";
import { InfoIcon } from "./Info";
import { SunIcon } from "./Sun";
import { MoonIcon } from "./Moon";
import { CloseIcon } from "./Close";
import { ArrowRightIcon } from "./ArrowRight";
import { ArrowLeftIcon } from "./ArrowLeft";
import { ExpandIcon } from "./Expand";
import { CollapseIcon } from "./Collapse";
import { PlaceholderIcon } from "./Placeholder";
import { DashboardIcon } from "./Dashboard";
import { CalendarIcon } from "./Calendar";
import { CopyIcon } from "./Copy";
import { RefreshIcon } from "./Refresh";
import { PlayIcon } from "./Play";
import { ImageIcon } from "./Image";
import { DragIcon } from "./Drag";
import { MoreIcon } from "./More";
import { ReportIcon } from "./Report";
import { LineChartIcon } from "./LineChart";
import { ChartIcon } from "./Chart";
import { InsightIcon } from "./Insight";
import { LogoSymbolIcon } from "./LogoSymbol";
import { LogoWordmarkIcon } from "./LogoWordmark";

export const iconRegistry: Record<string, ComponentType<IconRenderProps>> = {
  plus: PlusIcon,
  minus: MinusIcon,
  arrows: ArrowsIcon,
  arrowTopRight: ArrowTopRightIcon,
  arrowBottomRight: ArrowBottomRightIcon,
  info: InfoIcon,
  sun: SunIcon,
  moon: MoonIcon,
  close: CloseIcon,
  arrowRight: ArrowRightIcon,
  arrowLeft: ArrowLeftIcon,
  expand: ExpandIcon,
  collapse: CollapseIcon,
  placeholder: PlaceholderIcon,
  dashboard: DashboardIcon,
  calendar: CalendarIcon,
  copy: CopyIcon,
  refresh: RefreshIcon,
  play: PlayIcon,
  image: ImageIcon,
  drag: DragIcon,
  more: MoreIcon,
  report: ReportIcon,
  lineChart: LineChartIcon,
  chart: ChartIcon,
  insight: InsightIcon,
  logoSymbol: LogoSymbolIcon,
  logoWordmark: LogoWordmarkIcon,
};

export type IconRegistryName = keyof typeof iconRegistry;

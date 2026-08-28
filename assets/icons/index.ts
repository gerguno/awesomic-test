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
import { GripIcon } from "./Grip";
import { PlaceholderIcon } from "./Placeholder";
import { DashboardIcon } from "./Dashboard";
import { CalendarIcon } from "./Calendar";
import { CalendarDateIcon, CalendarGridIcon } from "./CalendarMark";
import { CopyIcon } from "./Copy";
import { RefreshIcon } from "./Refresh";
import { PlayIcon } from "./Play";
import { PauseIcon, PlaySquareIcon } from "./Pause";
import { ImageIcon } from "./Image";
import { DragIcon } from "./Drag";
import { MoreIcon } from "./More";
import { ReportIcon } from "./Report";
import { LineChartIcon } from "./LineChart";
import { ChartIcon } from "./Chart";
import { InsightIcon } from "./Insight";
import { LogoSymbolIcon } from "./LogoSymbol";
import { LogoWordmarkIcon } from "./LogoWordmark";
import { GmailIcon } from "./Gmail";
import { CampaignAcIcon, CampaignWdIcon } from "./Campaign";
import { GhostIcon } from "./Ghost";

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
  grip: GripIcon,
  placeholder: PlaceholderIcon,
  dashboard: DashboardIcon,
  calendar: CalendarIcon,
  calendarDate: CalendarDateIcon,
  calendarGrid: CalendarGridIcon,
  copy: CopyIcon,
  refresh: RefreshIcon,
  play: PlayIcon,
  pause: PauseIcon,
  playSquare: PlaySquareIcon,
  image: ImageIcon,
  drag: DragIcon,
  more: MoreIcon,
  report: ReportIcon,
  lineChart: LineChartIcon,
  chart: ChartIcon,
  insight: InsightIcon,
  logoSymbol: LogoSymbolIcon,
  logoWordmark: LogoWordmarkIcon,
  gmail: GmailIcon,
  campaignAc: CampaignAcIcon,
  campaignWd: CampaignWdIcon,
  ghost: GhostIcon,
};

export type IconRegistryName = keyof typeof iconRegistry;

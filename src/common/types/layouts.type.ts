import { Dispatch, SetStateAction } from "react";
import { IStatistics } from "../interfaces/layouts.interface";
import { ICafe } from "../interfaces/cafes.interface";

export type navBarProps = {
  title: string;
  cafe?: ICafe;
};

export type tabBarProps = {
  cafe: ICafe;
};

export type nextUIModalProps = {
  setVisible: Dispatch<SetStateAction<boolean>>;
  bindings: {
    open: boolean;
    onClose: () => void;
  };
};

export type dashboardProps = {
  statistics: IStatistics;
};

export type errorPageProps = {
  statusCode: number;
  message?: string;
};

export type tailwindColorsType =
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose";

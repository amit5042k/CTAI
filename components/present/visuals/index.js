"use client";

import * as N from "./numbers";
import * as G from "./geometry";
import * as M from "./measure";
import * as L from "./logic";
import { C } from "./kit";

const REGISTRY = {
  blocks: N.Blocks,
  placeChart: N.PlaceChart,
  sequence: N.Sequence,
  numberLine: N.NumberLine,
  dots: N.Dots,
  machine: N.Machine,
  worksteps: N.Worksteps,
  hundredGrid: N.HundredGrid,
  bags: N.Bags,
  powers: N.Powers,
  converter: N.Converter,
  ratio: N.Ratio,
  solids: G.Solids,
  shapes: G.Shapes,
  tiles: G.Tiles,
  symmetry: G.Symmetry,
  angle: G.Angle,
  lines: G.Lines,
  areaGrid: G.AreaGrid,
  construction: G.Construction,
  fractions: G.Fractions,
  fractionArea: G.FractionArea,
  share: M.Share,
  array: M.ArrayDots,
  balance: M.Balance,
  money: M.Money,
  clock: M.Clock,
  ruler: M.Ruler,
  gridMap: M.GridMap,
  cipher: L.Cipher,
  chart: L.Chart,
  clues: L.Clues,
  flow: L.Flow,
  cards: L.Cards,
  tree: L.Tree,
  hub: L.Hub,
  bias: L.Bias,
};

export const VISUAL_TYPES = Object.keys(REGISTRY);

export default function Visual({ spec, interactive = false }) {
  const Comp = spec && REGISTRY[spec.type];
  if (!Comp) {
    return (
      <div style={{ flex: 1, display: "grid", placeItems: "center", color: C.muted, fontSize: 28 }}>
        {spec?.type ? `Unknown visual: ${spec.type}` : ""}
      </div>
    );
  }
  return <Comp {...(spec.props || {})} interactive={interactive} />;
}

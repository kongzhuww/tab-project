import { reactive, readonly, type DeepReadonly } from "vue";

export interface NavWheelSector {
  id: string;
  title: string;
  icon: string;
  desc?: string;
  angleDeg: number;
  x: number;
  y: number;
  size?: number;
  isShortcut?: boolean;
  isCustom?: boolean;
}

export interface NavWheelBeam {
  visible: boolean;
  wedgePath: string;
  arcPath: string;
  line1: { x1: number; y1: number; x2: number; y2: number };
  line2: { x1: number; y1: number; x2: number; y2: number };
}

export interface NavWheelState {
  mounted: boolean;
  isOpen: boolean;
  isExpanded: boolean;
  mode: string;
  ballPosition: { x: number; y: number };
  hub: {
    icon: string;
    title: string;
    desc: string;
    active: boolean;
  };
  activeSectorId: string | null;
  sectors: NavWheelSector[];
  beam: NavWheelBeam;
}

const defaultHub = () => ({
  icon: "🧭",
  title: "快捷轮盘",
  desc: "移动鼠标选择",
  active: false
});

const defaultBeam = (): NavWheelBeam => ({
  visible: false,
  wedgePath: "",
  arcPath: "",
  line1: { x1: 0, y1: 0, x2: 0, y2: 0 },
  line2: { x1: 0, y1: 0, x2: 0, y2: 0 }
});

export const navWheelState = reactive<NavWheelState>({
  mounted: false,
  isOpen: false,
  isExpanded: false,
  mode: "main",
  ballPosition: { x: 0, y: 0 },
  hub: defaultHub(),
  activeSectorId: null,
  sectors: [],
  beam: defaultBeam()
});

export type NavWheelActionHandler = (action: string, payload?: any) => void;
let actionHandler: NavWheelActionHandler | null = null;

export function calculateBeamPath(angleDeg: number | null, count: number): NavWheelBeam {
  if (typeof angleDeg !== "number" || !count) {
    return defaultBeam();
  }

  const cx = 160;
  const cy = 160;
  const rInner = 26;
  const rOuter = 154;
  const deltaDeg = 360 / count;

  const startAngle = angleDeg - deltaDeg / 2;
  const endAngle = angleDeg + deltaDeg / 2;

  const rad1 = (startAngle * Math.PI) / 180;
  const rad2 = (endAngle * Math.PI) / 180;

  const x1Inner = cx + rInner * Math.cos(rad1);
  const y1Inner = cy + rInner * Math.sin(rad1);
  const x1Outer = cx + rOuter * Math.cos(rad1);
  const y1Outer = cy + rOuter * Math.sin(rad1);

  const x2Inner = cx + rInner * Math.cos(rad2);
  const y2Inner = cy + rInner * Math.sin(rad2);
  const x2Outer = cx + rOuter * Math.cos(rad2);
  const y2Outer = cy + rOuter * Math.sin(rad2);

  const largeArcFlag = deltaDeg > 180 ? 1 : 0;

  const wedgePath =
    `M ${x1Inner.toFixed(1)} ${y1Inner.toFixed(1)} ` +
    `L ${x1Outer.toFixed(1)} ${y1Outer.toFixed(1)} ` +
    `A ${rOuter} ${rOuter} 0 ${largeArcFlag} 1 ${x2Outer.toFixed(1)} ${y2Outer.toFixed(1)} ` +
    `L ${x2Inner.toFixed(1)} ${y2Inner.toFixed(1)} ` +
    `A ${rInner} ${rInner} 0 ${largeArcFlag} 0 ${x1Inner.toFixed(1)} ${y1Inner.toFixed(1)} Z`;

  const arcPath =
    `M ${x1Outer.toFixed(1)} ${y1Outer.toFixed(1)} ` +
    `A ${rOuter} ${rOuter} 0 ${largeArcFlag} 1 ${x2Outer.toFixed(1)} ${y2Outer.toFixed(1)}`;

  return {
    visible: true,
    wedgePath,
    arcPath,
    line1: {
      x1: parseFloat(x1Inner.toFixed(1)),
      y1: parseFloat(y1Inner.toFixed(1)),
      x2: parseFloat(x1Outer.toFixed(1)),
      y2: parseFloat(y1Outer.toFixed(1))
    },
    line2: {
      x1: parseFloat(x2Inner.toFixed(1)),
      y1: parseFloat(y2Inner.toFixed(1)),
      x2: parseFloat(x2Outer.toFixed(1)),
      y2: parseFloat(y2Outer.toFixed(1))
    }
  };
}

export const navWheelController = {
  get state() {
    return navWheelState;
  },

  getSnapshot(): DeepReadonly<NavWheelState> {
    return readonly(navWheelState);
  },

  setMounted(mounted: boolean) {
    navWheelState.mounted = mounted;
  },

  setBallPosition(x: number, y: number) {
    navWheelState.ballPosition.x = x;
    navWheelState.ballPosition.y = y;
  },

  setVisibility(visible: boolean) {
    navWheelState.isOpen = visible;
  },

  setHub(hubInfo: { icon?: string; title?: string; desc?: string; active?: boolean } | null) {
    if (!hubInfo) {
      navWheelState.hub = defaultHub();
    } else {
      navWheelState.hub = {
        icon: hubInfo.icon || "🧭",
        title: hubInfo.title || "快捷轮盘",
        desc: hubInfo.desc || "移动鼠标选择",
        active: !!hubInfo.active
      };
    }
  },

  setBeam(angleDeg: number | null, count: number) {
    navWheelState.beam = calculateBeamPath(angleDeg, count);
  },

  setActiveSector(id: string | null) {
    navWheelState.activeSectorId = id;
  },

  setSectors(sectors: NavWheelSector[]) {
    navWheelState.sectors = [...sectors];
  },

  expand(x?: number, y?: number, mode: string = "main") {
    navWheelState.isOpen = true;
    navWheelState.isExpanded = true;
    navWheelState.mode = mode;
    if (typeof x === "number" && typeof y === "number") {
      this.setBallPosition(x, y);
    }
  },

  collapse() {
    navWheelState.isExpanded = false;
    navWheelState.mode = "main";
    navWheelState.activeSectorId = null;
    navWheelState.beam = defaultBeam();
    navWheelState.hub = defaultHub();
  },

  setWheelMode(mode: string) {
    navWheelState.mode = mode;
  },

  setActionHandler(handler: NavWheelActionHandler | null) {
    actionHandler = handler;
  },

  dispatch(action: string, payload?: any) {
    actionHandler?.(action, payload);
  }
};

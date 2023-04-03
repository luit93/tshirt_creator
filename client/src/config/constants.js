import { swatch, fileIcon, ai, logo, pattern } from "../assets";

export const EditorTabs = [
  {
    name: "colorpicker",
    icon: swatch,
  },
  {
    name: "filepicker",
    icon: fileIcon,
  },
  {
    name: "aipicker",
    icon: ai,
  },
];

export const FilterTabs = [
  {
    name: "logo",
    icon: logo,
  },
  {
    name: "pattern",
    icon: pattern,
  },
];

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logo",
  },
  pattern: {
    stateProperty: "patternDecal",
    filterTab: "pattern",
  },
};

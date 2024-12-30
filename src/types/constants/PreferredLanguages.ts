import EngLogo from "@logos/languages/united-states.webp";
import ChinaLogo from "@logos/languages/china.webp";
import FranceLogo from "@logos/languages/france.webp";
import KoreaLogo from "@logos/languages/south-korea.webp";
import SpainLogo from "@logos/languages/spain.webp";
import VietnamLogo from "@logos/languages/vietnam.webp";
import EthiopiaLogo from "@logos/languages/ethiopia.webp";
import { PreferredLanguage } from "@interfaces/components/preferredLanguage";

export const preferredLanguages: PreferredLanguage[] = [
  {
    code: "en",
    value: "English",
    image: EngLogo,
    key: "en",
  },
  {
    code: "am",
    value: "Amharic (አማርኛ)",
    image: EthiopiaLogo,
    key: "am",
  },
  {
    code: "zh",
    value: "Chinese (中文)",
    image: ChinaLogo,
    key: "zh",
  },
  {
    code: "fr",
    value: "French (Français)",
    image: FranceLogo,
    key: "fr",
  },
  {
    code: "ko",
    value: "Korean (한국어)",
    image: KoreaLogo,
    key: "ko",
  },
  {
    code: "es",
    value: "Spanish (Español)",
    image: SpainLogo,
    key: "es",
  },
  {
    code: "vi",
    value: "Vietnamese (Tiếng Việt)",
    image: VietnamLogo,
    key: "vi",
  },
];

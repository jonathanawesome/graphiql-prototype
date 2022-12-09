import { Caret } from './Caret';
import { Check } from './Check';
import { ChevronLarge } from './ChevronLarge';
import { ChevronSmall } from './ChevronSmall';
import { Close } from './Close';
import { Code } from './Code';
import { Command } from './Command';
import { Dark } from './Dark';
import { Docs } from './Docs';
import { Ellipsis } from './Ellipsis';
import { ExclamationTriangle } from './ExclamationTriangle';
import { Gear } from './Gear';
import { GraphQLIcon } from './GraphQLIcon';
import { Input } from './Input';
import { InsertNewOperation } from './InsertNewOperation';
import { Light } from './Light';
import { Play } from './Play';
import { Plus } from './Plus';
import { Prettier } from './Prettier';
import { Refresh } from './Refresh';
import { Search } from './Search';
import { SeparatorRound } from './SeparatorRound';
import { SplitToTabs } from './SplitToTabs';

export const IconMap = {
  Caret,
  Check,
  ChevronLarge,
  ChevronSmall,
  Close,
  Code,
  Command,
  Dark,
  Docs,
  Ellipsis,
  ExclamationTriangle,
  Gear,
  GraphQLIcon,
  Input,
  InsertNewOperation,
  Light,
  Play,
  Plus,
  Prettier,
  Refresh,
  Search,
  SeparatorRound,
  SplitToTabs,
};

export type IconNames = keyof typeof IconMap;

export type IconProps = { name: IconNames };

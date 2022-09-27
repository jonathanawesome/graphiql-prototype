import { Caret } from './Caret';
import { Check } from './Check';
import { ChevronLarge } from './ChevronLarge';
import { ChevronSmall } from './ChevronSmall';
import { Close } from './Close';
import { Code } from './Code';
import { Command } from './Command';
import { Docs } from './Docs';
import { Ellipsis } from './Ellipsis';
import { Gear } from './Gear';
import { GraphQLIcon } from './GraphQLIcon';
import { Input } from './Input';
import { Play } from './Play';
import { Plus } from './Plus';
import { Prettier } from './Prettier';
import { Refresh } from './Refresh';
import { Search } from './Search';
import { SeparatorRound } from './SeparatorRound';

export const IconMap = {
  Caret,
  Check,
  ChevronLarge,
  ChevronSmall,
  Close,
  Code,
  Command,
  Docs,
  Ellipsis,
  Gear,
  GraphQLIcon,
  Input,
  Play,
  Plus,
  Prettier,
  Refresh,
  Search,
  SeparatorRound,
};

export type IconNames = keyof typeof IconMap;

export type IconProps = { name: IconNames };

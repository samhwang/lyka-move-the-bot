const MOVE_COMMANDS = ['N', 'S', 'E', 'W'] as const;
const GRAB_COMMANDS = ['G', 'D'] as const;
const VALID_COMMANDS = [...MOVE_COMMANDS, ...GRAB_COMMANDS] as const;
export type Command = (typeof VALID_COMMANDS)[number];

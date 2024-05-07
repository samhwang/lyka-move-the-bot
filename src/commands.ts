const LINEAR_COMMANDS = ['N', 'S', 'E', 'W'] as const;
const DIAGONAL_COMMANDS = ['NE', 'EN', 'NW', 'WN', 'SE', 'ES', 'SW', 'WS'] as const;
const GRAB_COMMANDS = ['G', 'D'] as const;
const VALID_COMMANDS = [...LINEAR_COMMANDS, ...DIAGONAL_COMMANDS, ...GRAB_COMMANDS] as const;
export type Command = (typeof VALID_COMMANDS)[number];

function isValidCommand(char: string): char is Command {
  return VALID_COMMANDS.includes(char as Command);
}

export function parseInstruction(instruction: string): Command[] {
  const split =  instruction.split(' ');
  const commands: Command[] = [];
  for (const char of split) {
    if (!isValidCommand(char)) {
      console.error('INVALID COMMAND');
      continue;
    }
    commands.push(char);
  }

  return commands;
}

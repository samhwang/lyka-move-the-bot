const LINEAR_COMMANDS = ['N', 'S', 'E', 'W'] as const;
const DIAGONAL_COMMANDS = ['NE', 'EN', 'NW', 'WN', 'SE', 'ES', 'SW', 'WS'] as const;
type DiagonalCommand = (typeof DIAGONAL_COMMANDS)[number];
const GRAB_COMMANDS = ['G', 'D'] as const;
type GrabCommand = (typeof GRAB_COMMANDS)[number];
const VALID_COMMANDS = [...LINEAR_COMMANDS, ...DIAGONAL_COMMANDS, ...GRAB_COMMANDS] as const;
export type Command = (typeof VALID_COMMANDS)[number];

function isValidCommand(char: string): char is Command {
  return VALID_COMMANDS.includes(char as Command);
}

function isGrabCommand(char: string): char is GrabCommand {
  return GRAB_COMMANDS.includes(char as GrabCommand);
}

function isDiagonalCommand(char: string): char is DiagonalCommand {
  return DIAGONAL_COMMANDS.includes(char as DiagonalCommand);
}

export function parseInstruction(instruction: string): Command[] {
  const split = instruction.split(' ');
  const commands: Command[] = [];
  let index = 0;

  while (index < split.length) {
    const char = split[index];

    if (!isValidCommand(char)) {
      console.error(`INVALID COMMAND. Current command: ${char}`);
      index++;
      continue;
    }

    if (isGrabCommand(char)) {
      commands.push(char);
      index++;
      continue;
    }

    const isLastChar = index === split.length - 1;
    if (isLastChar) {
      commands.push(char);
      index++;
      continue;
    }

    const nextChar = split[index + 1];
    const compoundDirection = char + nextChar;
    if (isDiagonalCommand(compoundDirection)) {
      commands.push(compoundDirection);
      index += 2;
      continue;
    }

    commands.push(char);
    index++;
  }

  return commands;
}

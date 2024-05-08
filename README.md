# Move the Robot

Lyka move the robot assessment.

## Requirements

- Node 20
- PNPM v9

## Setup

```bash
pnpm install
```

## Scripts

```bash
pnpm run test  # Run unit tests
pnpm run start # Run the script
```

## Running the script

- Open the `bin/move.ts` file.
- There are a few places to edit the input. This will be marked with the `@TODO`:
  - `ROBOT_POSITION`: Starting position of the robot in the warehouse
  - `COMMAND`: The command to feed into the robot
- After editing, run the script with `pnpm run start`.

## The Grid

Assuming the grid is a 10x10 square grid like this

```txt
S  0 1 2 3 4 5 6 7 8 9
9 | | | | | | | | | | |
8 | | | | | | | | | | |
7 | | | | | | | | | | |
6 | | | | | | | | | | |
5 | | | | | | | | | | |
4 | | | | | | | | | | |
3 | | | | | | | | | | |
2 | | | | | | | | | | |
1 | | | | | | | | | | |
0 | | | | | | | | | | |
```

## Assumptions

- There is only 1 robot in the whole factory.
- The starting and finishing location is always within the grid ([0-9, 0-9]).
- The command lines being fed into the robot are always valid for each test case. (i.e. part 1 commands only has N W E S).

## Part 1

The robot should accept the following commands:

- N go north
- W go west
- S go south
- E go east


## Part 2

The robot should now accept additional `D` and `G` commands. `G` will grab a crate, and `D` will drop the robot is holding.

Rules:

- The robot can only hold 1 crate at a time.
- The robot can only drop a crate if it's holding one.
- The robot cannot try to grab a crate if there's none.
- The robot cannot drop a crate on top of another crate.

## Part 3

Modify the robot's movement so that it can take advantage of the new diagonals, minimize the steps it take to move the robot around. The instruction format stays the same.

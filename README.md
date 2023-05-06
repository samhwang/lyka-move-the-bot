# Move the Robot

Lyka move the robot assessment.

## Requirements

- Node 18
- PNPM v8

## Setup

```bash
pnpm install
```

## Scripts

```bash
pnpm run test  # Run unit tests
pnpm run start # Run the script
```

## The Grid

Assuming the grid is a 10x10 square grid like this
   0 1 2 3 4 5 6 7 8 9
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

## Assumptions

- The starting location is always within the grid ([0-9, 0-9]).
- The command lines are always valid for each test case. (i.e. part 1 commands only has N W E S).

## Part 1

The robot should accept the following commands:

- N go north
- W go west
- S go south
- E go east

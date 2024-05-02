type Row = number;
type Column = number;
export type Coordinates = [Row, Column];

export type Robot = {
  position: Coordinates;
  hasCrate: boolean;
};

export type Crate = {
  position: Coordinates;
};

export type FactoryState = {
  robot: Robot;
  crates: Crate[];
};

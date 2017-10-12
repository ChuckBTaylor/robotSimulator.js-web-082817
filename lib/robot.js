"use strict";
const directions = ["north", "east", "south", "west"];

function Robot() {
  this.bearing = "north";
  this.coordinates = [0, 0];
}

Robot.prototype.orient = function(direction) {
  if (directions.includes(direction)) {
    this.bearing = direction;
  } else {
    throw new Error("Invalid Robot Bearing");
  }
};

Robot.prototype.turnRight = function() {
  switch (this.bearing) {
    case "east":
      this.bearing = "south";
      break;
    case "south":
      this.bearing = "west";
      break;
    case "west":
      this.bearing = "north";
      break;
    case "north":
      this.bearing = "east";
      break;
  }
};

Robot.prototype.turnLeft = function() {
  switch (this.bearing) {
    case "east":
      this.bearing = "north";
      break;
    case "south":
      this.bearing = "east";
      break;
    case "west":
      this.bearing = "south";
      break;
    case "north":
      this.bearing = "west";
      break;
  }
};

Robot.prototype.at = function(x, y) {
  this.coordinates[0] = x;
  this.coordinates[1] = y;
};

Robot.prototype.advance = function() {
  switch (this.bearing) {
    case "east":
      ++this.coordinates[0];
      break;
    case "south":
      --this.coordinates[1];
      break;
    case "west":
      --this.coordinates[0];
      break;
    case "north":
      ++this.coordinates[1];
      break;
  }
};

Robot.prototype.instructions = function(instructions) {
  const instructs = [];
  for (const letter of instructions.split("")) {
    switch (letter) {
      case "L":
        instructs.push("turnLeft");
        break;
      case "R":
        instructs.push("turnRight");
        break;
      case "A":
        instructs.push("advance");
        break;
    }
  }
  return instructs;
};

Robot.prototype.evaluate = function(instructs) {
  const movement = this.instructions(instructs);
  for (const move of movement) {
    this[move]();
  }
};

Robot.prototype.place = function(coords = {}) {
  this.coordinates[0] = coords.x;
  this.coordinates[1] = coords.y;
  this.bearing = coords.direction;
};

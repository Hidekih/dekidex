import { MoveGen } from "./types";

export function compareLevel( a: MoveGen, b: MoveGen ) {
  if ( a.level_learned_at < b.level_learned_at ){
    return -1;
  }
  if ( a.level_learned_at > b.level_learned_at ){
    return 1;
  }
  return 0;
}
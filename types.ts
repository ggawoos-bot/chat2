
export interface Vector2D {
  x: number;
  y: number;
}

export interface CatState {
  position: Vector2D;
  velocity: Vector2D;
}

export interface PlatformState {
  id: number;
  position: Vector2D;
  width: number;
}

export type GameStatus = 'start' | 'playing' | 'gameOver';

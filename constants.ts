
// Game dimensions (aspect ratio similar to a phone)
export const GAME_WIDTH = 414;
export const GAME_HEIGHT = 736;

// Cat physics
export const GRAVITY = 0.6;
export const JUMP_FORCE = -14;
export const HORIZONTAL_SPEED = 6;
export const MAX_HORIZONTAL_SPEED = 8;
export const HORIZONTAL_FRICTION = 0.95;

// Platform properties
export const PLATFORM_HEIGHT = 20;
export const PLATFORM_MIN_WIDTH = 80;
export const PLATFORM_MAX_WIDTH = 130;
export const PLATFORM_START_COUNT = 8;
export const PLATFORM_SPAWN_RANGE_Y: [number, number] = [60, 120];

// Game rules
export const CAMERA_SCROLL_THRESHOLD_RATIO = 0.4; // 40% from top of screen

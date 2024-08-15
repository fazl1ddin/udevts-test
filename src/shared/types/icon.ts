import { SpritesMap } from "../assets/sprite.gen";

type IconName<Key extends keyof SpritesMap> = `${SpritesMap[Key]}`;

type AnyIconName = {
  [Key in keyof SpritesMap]: IconName<Key>;
}[keyof SpritesMap];

export { type AnyIconName };

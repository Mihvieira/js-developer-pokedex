export class Pokemon {
  number: number | undefined;
  name: string | undefined;
  type: string | undefined;
  types: string[] = [];
  photo: string | undefined;
  height: number | undefined;
  weight: number | undefined;
  abilities: string[] = [];
  ability: string | undefined;
  stats: string[] = [];
  stat: string | undefined;
  statsNumber: number[] = [];
  statNumber: number | undefined;
  moves: string[] = [];
  move: string | undefined;
  url!: string;
}

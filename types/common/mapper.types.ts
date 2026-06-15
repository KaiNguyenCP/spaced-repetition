export interface Mapper<Entity, DTO> {
  toDTO(entity: Entity): DTO;
}

export class BaseMapper {
  static mapMany<E, D>(entities: E[] | undefined, mapFn: (e: E) => D): D[] {
    return entities?.map(mapFn) || [];
  }

  static pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const result = {} as Pick<T, K>;
    keys.forEach((key) => {
      if (obj && Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = obj[key];
      }
    });
    return result;
  }
}

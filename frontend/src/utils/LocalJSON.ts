export class LocalJson<T> {
  constructor(private key: string) {}
  get() {
    let data: T | null = null

    try {
      const json = window.localStorage.getItem(this.key)
      data = json ? (JSON.parse(json) as T) : null
    } catch (error) {
      console.error(error)
    }

    return data
  }
  set(data: T | null) {
    if (data) {
      try {
        const json = JSON.stringify(data)
        window.localStorage.setItem(this.key, json)
      } catch (error) {
        console.error(error)
      }
    } else {
      window.localStorage.removeItem(this.key)
    }
  }
}

export class LocalJsonMap<T> {
  private mapStorage: LocalJson<Record<string, T | undefined>>
  constructor(
    id: string,
    private defaultValue?: Record<string, T>
  ) {
    this.mapStorage = new LocalJson<Record<string, T | undefined>>(id)
  }
  private getMap() {
    return this.mapStorage.get() ?? this.defaultValue ?? {}
  }
  getItem(key: string) {
    const map = this.getMap()
    return map[key]
  }
  setItem(key: string, value: T) {
    const map = this.getMap()
    map[key] = value
    this.mapStorage.set(map)
  }
  removeItem(key: string) {
    const map = this.getMap()
    delete map[key]
    this.mapStorage.set(map)
  }
}

export class Project {
  constructor(
    public id: number,
    public name: string,
    public type?: string,
    public role?: any,
    public description?: string,
    public lastUpdated?: number,
  ) { }
}

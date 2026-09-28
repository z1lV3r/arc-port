export class WorkspaceTab {
  public id: string;
  public checkpointUrl: string;

  constructor(
    id: string,
    checkpointUrl: string,
  ) {
    this.id = id;
    this.checkpointUrl = checkpointUrl;
  }
}
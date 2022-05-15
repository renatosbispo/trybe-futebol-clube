import TeamModelInterface from './TeamModel.interface';

export default interface TeamRepoInterface {
  findAll(): Promise<TeamModelInterface[]>;
  findById(id: number): Promise<TeamModelInterface>;
}

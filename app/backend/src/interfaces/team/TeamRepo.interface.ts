import TeamModelInterface from './TeamModel.interface';

export default interface TeamRepoInterface {
  findAll(): Promise<TeamModelInterface[]>;
}

import { Model, NUMBER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './Team';

class Match extends Model {
  public id!: number;

  public homeTeam!: number;

  public homeTeamGoals!: number;

  public awayTeam!: number;

  public awayTeamGoals!: number;

  public inProgress: boolean;
}

Match.init(
  {
    id: NUMBER,
    homeTeam: NUMBER,
    homeTeamGoals: NUMBER,
    awayTeam: NUMBER,
    awayTeamGoals: NUMBER,
    inProgress: BOOLEAN,
  },
  {
    underscored: true,
    sequelize: db,
    timestamps: false,
    tableName: 'matches',
  },
);

Match.belongsTo(Team, { foreignKey: 'home_team', as: 'homeTeam' });
Match.belongsTo(Team, { foreignKey: 'away_team', as: 'awayTeam' });

Team.hasMany(Match, { as: 'matches' });

export default Match;

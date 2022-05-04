import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Match from './Match';

class Team extends Model {
  public id!: number;

  public teamName!: string;
}

Team.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    teamName: {
      allowNull: false,
      type: STRING,
      field: 'team_name',
    },
  },
  {
    underscored: true,
    sequelize: db,
    timestamps: false,
    tableName: 'teams',
  },
);

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'homeTeamInfo' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'awayTeamInfo' });

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeMatches' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayMatches' });

export default Team;

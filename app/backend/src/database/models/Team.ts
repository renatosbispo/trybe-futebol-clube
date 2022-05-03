import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Team extends Model {
  public id!: number;

  public teamName!: string;
}

Team.init(
  {
    id: INTEGER,
    teamName: STRING,
  },
  {
    underscored: true,
    sequelize: db,
    timestamps: false,
    tableName: 'teams',
  },
);

export default Team;

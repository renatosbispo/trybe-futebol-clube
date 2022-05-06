import { Model } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class ExampleModel extends Model {
  // public <campo>!: <tipo>;
}

ExampleModel.init(
  {
    // ... Campos
  },
  {
    // ... Outras configs
    underscored: true,
    sequelize: db,
    // modelName: 'example',
    timestamps: false,
  },
);

/**
 * `Workaround` para aplicar as associations em TS:
 * Associations 1:N devem ficar em uma das instâncias de modelo
 * */

// OtherModel.belongsTo(ExampleModel, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(ExampleModel, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// ExampleModel.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// ExampleModel.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default ExampleModel;

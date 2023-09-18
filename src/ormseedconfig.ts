import ormconfig from '@app/ormconfig';

const ormseedconfig = {
  ...ormconfig,
  migrations: [__dirname + '/src/seeds/*.ts'],
};

export default ormseedconfig;

import { Sequelize } from 'sequelize';
import { globSync } from 'glob';
import path from 'path';
import { environment } from '../../config/environment';

// Initialize Sequelize
const sequelize = new Sequelize(
  environment.database.name || 'database',
  environment.database.user || 'root',
  environment.database.password,
  {
    host: environment.database.host,
    dialect: environment.database.dialect,
    port: environment.database.port,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    logging: process.env.NODE_ENV === 'production' ? false : console.log,
  }
);

const models: any = {};

// Dynamic model loader
const loadModels = () => {
  // Find all .entity.{ts,js} files in modules and shared folders
  // Search from the project root (assuming this file is at src/shared/database/index.ts or dist/shared/database/index.js)
  // We use process.cwd() mostly, but for robust finding in dist vs src, we might need to be careful.
  // Using a glob pattern that matches both .ts (dev) and .js (prod), but ignores .d.ts
  const pattern = 'src/**/entities/*.entity.{ts,js}'; // For dev (ts-node)

  // If running in dist, the path structure is similar: dist/modules/...
  // We can try to detect if we are in src or dist, or just look for both patterns relative to CWD if CWD is root.
  // Assuming CWD is project root.

  // Better approach: Search in 'src' or 'dist' depending on where we are?
  // Or just search for the relative pattern.

  // If we are in 'dist', the source is in 'dist'. If 'src', it's 'src'.
  const isDist = __dirname.includes('dist');
  const rootDir = isDist ? 'dist' : 'src';

  const searchPattern = `${rootDir}/**/entities/*.entity.{ts,js}`;

  const files = globSync(searchPattern, {
    cwd: process.cwd(),
    ignore: ['**/*.d.ts']
  });

  files.forEach((file) => {
    // Import model
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const modelDef = require(path.resolve(process.cwd(), file));

    // Assume default export or named export matches file name logic if needed.
    // Standard sequelize model definition usually exports a function or the model class.
    // For now, we assume the file exports the initialized model or a function to initialize it.
    // If it's a function (sequelize, DataTypes) => Model

    if (typeof modelDef === 'function') {
      const model = modelDef(sequelize);
      models[model.name] = model;
    } else if (modelDef.default && typeof modelDef.default === 'function') {
        const model = modelDef.default(sequelize);
        models[model.name] = model;
    }
     // Support class-based models if they are already initialized or static
  });

  // Execute associate if exists
  Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });
};

// Initial load
loadModels();

export { sequelize, models };

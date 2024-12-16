import express from 'express';
import cors from 'cors';
import cowRoutes from './routes/cowRoutes';
import authRoutes from './routes/authRoutes';
import medicalCheckRoutes from './routes/medicalCheckRoutes';
import birthRoutes from './routes/birthRoutes';
import swaggerUi from 'swagger-ui-express';

import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import milkProductionRoutes from './routes/milkProductionRoutes';

const app = express();

const swaggerPath = path.resolve(__dirname, 'swagger.yml');
const file = fs.readFileSync(swaggerPath, 'utf8');

const swaggerDocument = YAML.parse(file);

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cows', cowRoutes);
app.use('/api/medical-checks', medicalCheckRoutes);
app.use('/api/births', birthRoutes);
app.use('/api/milk-production', milkProductionRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

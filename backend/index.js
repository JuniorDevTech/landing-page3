require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const essaiController = require('./controllers/essaiController');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de sécurité
app.use(helmet());

// Configuration CORS pour autoriser le frontend
app.use(cors({
  origin: ['http://localhost:8081', 'http://localhost:5173', 'http://127.0.0.1:8081'],
  credentials: true
}));

// Parser JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting pour protection anti-spam
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Maximum 5 demandes par IP
  message: {
    success: false,
    message: 'Trop de demandes. Veuillez réessayer dans 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 10, // Maximum 10 demandes par IP
  message: {
    success: false,
    message: 'Trop de demandes. Veuillez réessayer dans 1 heure.'
  }
});

// Appliquer le rate limiting sur les routes API
app.use('/api/', apiLimiter);

// Routes
app.post('/api/demandes-essai', limiter, essaiController.createDemande);
app.get('/api/demandes-essai', essaiController.getDemandes);

// Route de santé
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend API is running' });
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée'
  });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Une erreur interne est survenue'
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend démarré sur le port ${PORT}`);
  console.log(`📊 API disponible sur http://localhost:${PORT}/api/demandes-essai`);
});

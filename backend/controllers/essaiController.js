const pool = require('../config/database');

const PAYS_VALIDES = ['Côte d\'Ivoire', 'Cameroun', 'Burkina Faso', 'Sénégal', 'Gabon'];

const validateDemande = (data) => {
  const errors = [];

  if (!data.nom || data.nom.trim().length === 0) {
    errors.push('Le nom est obligatoire');
  } else if (data.nom.length > 100) {
    errors.push('Le nom ne doit pas dépasser 100 caractères');
  }

  if (!data.prenom || data.prenom.trim().length === 0) {
    errors.push('Le prénom est obligatoire');
  } else if (data.prenom.length > 100) {
    errors.push('Le prénom ne doit pas dépasser 100 caractères');
  }

  if (data.email && data.email.trim() !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push('L\'email n\'est pas valide');
    }
  }

  if (!data.pays || !PAYS_VALIDES.includes(data.pays)) {
    errors.push('Le pays doit être parmi: Côte d\'Ivoire, Cameroun, Burkina Faso, Sénégal, Gabon');
  }

  if (!data.date_essai_souhaitee) {
    errors.push('La date d\'essai souhaitée est obligatoire');
  } else {
    const dateEssai = new Date(data.date_essai_souhaitee);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(dateEssai.getTime())) {
      errors.push('La date d\'essai n\'est pas valide');
    } else if (dateEssai < today) {
      errors.push('La date d\'essai doit être dans le futur');
    }
  }

  return errors;
};

const createDemande = async (req, res) => {
  try {
    const validationErrors = validateDemande(req.body);

    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Erreur de validation',
        errors: validationErrors
      });
    }

    const { nom, prenom, email, pays, date_essai_souhaitee } = req.body;
    const ip_address = req.ip || req.connection.remoteAddress;
    const user_agent = req.get('User-Agent');

    const [result] = await pool.execute(
      `INSERT INTO demandes_essai (nom, prenom, email, pays, date_essai_souhaitee, ip_address, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nom.trim(), prenom.trim(), email ? email.trim() : null, pays, date_essai_souhaitee, ip_address, user_agent]
    );

    res.status(201).json({
      success: true,
      message: 'Votre demande d\'essai a été enregistrée avec succès',
      data: {
        id: result.insertId,
        nom,
        prenom,
        email,
        pays,
        date_essai_souhaitee
      }
    });
  } catch (error) {
    console.error('Erreur lors de la création de la demande:', error);
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue lors de l\'enregistrement de votre demande'
    });
  }
};

const getDemandes = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM demandes_essai ORDER BY date_envoi DESC'
    );

    res.status(200).json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des demandes:', error);
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue lors de la récupération des demandes'
    });
  }
};

module.exports = {
  createDemande,
  getDemandes
};

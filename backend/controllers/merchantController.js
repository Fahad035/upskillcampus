const Merchant = require("../models/Merchant");

const SERVICE_CATALOG = [
  {
    name: "Custom Development",
    description: "Tailored solutions built to your exact specifications",
    price: 500,
    priceLabel: "Starting at $500"
  },
  {
    name: "Cloud Solutions",
    description: "Scalable cloud infrastructure and deployment",
    price: 300,
    priceLabel: "Starting at $300/mo"
  },
  {
    name: "Security Services",
    description: "Advanced security audits and protection",
    price: 200,
    priceLabel: "Starting at $200/mo"
  },
  {
    name: "Data Analytics",
    description: "Comprehensive data analysis and insights",
    price: 400,
    priceLabel: "Starting at $400/mo"
  },
  {
    name: "Mobile Apps",
    description: "Cross-platform mobile applications",
    price: 2000,
    priceLabel: "Starting at $2000"
  },
  {
    name: "SEO Optimization",
    description: "Boost your search engine rankings",
    price: 250,
    priceLabel: "Starting at $250/mo"
  },
  {
    name: "Email Marketing",
    description: "Automated marketing campaigns",
    price: 150,
    priceLabel: "Starting at $150/mo"
  },
  {
    name: "Web Hosting",
    description: "Fast and reliable hosting solutions",
    price: 50,
    priceLabel: "Starting at $50/mo"
  }
];

const syncMerchantServices = (merchant) => {
  const currentByName = new Map((merchant.services || []).map((service) => [service.name, service]));
  const normalized = SERVICE_CATALOG.map((catalogItem) => {
    const existing = currentByName.get(catalogItem.name);
    return {
      _id: existing?._id,
      name: catalogItem.name,
      description: catalogItem.description,
      price: catalogItem.price,
      priceLabel: catalogItem.priceLabel,
    };
  });

  const before = JSON.stringify((merchant.services || []).map((service) => ({
    name: service.name,
    description: service.description,
    price: service.price,
    priceLabel: service.priceLabel,
  })));
  const after = JSON.stringify(normalized.map((service) => ({
    name: service.name,
    description: service.description,
    price: service.price,
    priceLabel: service.priceLabel,
  })));

  if (before !== after || normalized.length !== (merchant.services || []).length) {
    merchant.services = normalized;
    return true;
  }

  return false;
};

// CREATE MERCHANT PROFILE
exports.createMerchant = async (req, res) => {
  try {
    const incomingServices = Array.isArray(req.body.services) && req.body.services.length > 0 ? req.body.services : SERVICE_CATALOG;

    const merchant = await Merchant.create({
      user: req.user.id,
      ...req.body,
      services: incomingServices,
    });

    res.json(merchant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL MERCHANTS
exports.getMerchants = async (req, res) => {
  const merchants = await Merchant.find().populate("user", "name email");

  await Promise.all(
    merchants.map(async (merchant) => {
      if (syncMerchantServices(merchant)) {
        await merchant.save();
      }
    })
  );

  res.json(merchants);
};

// GET SINGLE MERCHANT
exports.getMerchant = async (req, res) => {
  const merchant = await Merchant.findById(req.params.id);
  if (merchant && syncMerchantServices(merchant)) {
    await merchant.save();
  }
  res.json(merchant);
};

exports.addService = async (req, res) => {
  try {
    const merchant = await Merchant.findOne({ user: req.user.id });

    if (!merchant) {
      return res.status(404).json({ msg: "Merchant not found" });
    }

    merchant.services.push(req.body);

    await merchant.save();

    res.json(merchant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const merchant = await Merchant.findOne({ user: req.user.id });

    merchant.services = merchant.services.filter(
      (s) => s._id.toString() !== req.params.serviceId
    );

    await merchant.save();

    res.json({ msg: "Service removed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const merchant = await Merchant.findOne({ user: req.user.id });

    const service = merchant.services.id(req.params.serviceId);

    if (!service) return res.status(404).json({ msg: "Service not found" });

    service.name = req.body.name || service.name;
    service.price = req.body.price || service.price;

    await merchant.save();

    res.json(merchant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
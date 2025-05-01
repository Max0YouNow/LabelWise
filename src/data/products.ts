
export const products = {
  '1': {
    id: '1',
    name: "Organic Greek Yogurt",
    brand: "Nature's Best",
    healthScore: 87,
    letter: "A",
    category: "Dairy",
    status: 'safe',
    image: "https://images.unsplash.com/photo-1572656631137-7935297eff59?auto=format&fit=crop&q=80&w=1000",
    ingredients: "Organic Grade A Pasteurized Milk, Live Active Cultures (L. Bulgaricus, S. Thermophilus, L. Acidophilus, Bifidus, L. Casei)",
    misleadingClaims: [
      {
        claim: "High in Protein",
        reality: "Contains 18g of protein per serving, which is indeed high for yogurt.",
        severity: 'low'
      }
    ],
    nutrients: [
      { name: "Protein", value: "18g", percentage: 36 },
      { name: "Fat", value: "5g", percentage: 8 },
      { name: "Carbs", value: "7g", percentage: 2 },
      { name: "Calcium", value: "200mg", percentage: 20 },
    ],
    additives: [
      {
        name: "None",
        effect: "No artificial additives present",
        safety: 'safe'
      }
    ],
    servingAnalysis: {
      listed: "170g",
      actual: "170g",
      manipulation: false
    }
  },
  '2': {
    id: '2',
    name: "Whole Grain Cereal",
    brand: "HealthyStart",
    healthScore: 72,
    letter: "B+",
    category: "Breakfast",
    status: 'moderate',
    image: "https://images.unsplash.com/photo-1521483451569-e33803c0330c?auto=format&fit=crop&q=80&w=1000",
    ingredients: "Whole Grain Wheat, Rice, Corn, Sugar, Salt, Honey, Natural Flavors, Vitamin E (Mixed Tocopherols) Added to Preserve Freshness",
    misleadingClaims: [
      {
        claim: "Made with Whole Grains",
        reality: "Contains whole grains but also has added sugars.",
        severity: 'medium'
      },
      {
        claim: "All Natural",
        reality: "Contains 'natural flavors' which can include processed ingredients.",
        severity: 'medium'
      }
    ],
    nutrients: [
      { name: "Protein", value: "4g", percentage: 8 },
      { name: "Fiber", value: "8g", percentage: 32 },
      { name: "Sugar", value: "6g", percentage: 12 },
      { name: "Iron", value: "8mg", percentage: 45 },
    ],
    additives: [
      {
        name: "Natural Flavors",
        effect: "Can include a wide range of processed ingredients",
        safety: 'moderate'
      }
    ],
    servingAnalysis: {
      listed: "30g",
      actual: "45g",
      manipulation: true
    }
  },
  '3': {
    id: '3',
    name: "Chocolate Flavored Milk",
    brand: "DairyDeluxe",
    healthScore: 45,
    letter: "D+",
    category: "Dairy",
    status: 'unsafe',
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=1000",
    ingredients: "Milk, Sugar, Corn Syrup, Cocoa (Processed with Alkali), Salt, Carrageenan, Artificial Flavor, Vitamin D3",
    misleadingClaims: [
      {
        claim: "Good Source of Calcium",
        reality: "Contains calcium but also high amounts of added sugars.",
        severity: 'high'
      },
      {
        claim: "Made with Real Cocoa",
        reality: "Uses alkali-processed cocoa which has fewer flavanols.",
        severity: 'medium'
      },
      {
        claim: "Excellent for Kids",
        reality: "High sugar content makes it less ideal for children.",
        severity: 'high'
      }
    ],
    nutrients: [
      { name: "Protein", value: "8g", percentage: 16 },
      { name: "Sugar", value: "27g", percentage: 54 },
      { name: "Fat", value: "8g", percentage: 12 },
      { name: "Calcium", value: "300mg", percentage: 30 },
    ],
    additives: [
      {
        name: "Carrageenan",
        effect: "May cause digestive issues in some individuals",
        safety: 'moderate'
      },
      {
        name: "Artificial Flavor",
        effect: "Synthetic compounds to mimic natural flavors",
        safety: 'unsafe'
      }
    ],
    servingAnalysis: {
      listed: "240ml",
      actual: "240ml",
      manipulation: false
    }
  },
  '101': {
    id: '101',
    name: "Organic Plain Greek Yogurt",
    brand: "Wholesome Farms",
    healthScore: 92,
    letter: "A+",
    category: "Dairy",
    status: 'safe',
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=1000",
    ingredients: "Organic Pasteurized Milk, Live Active Cultures (S. Thermophilus, L. Bulgaricus, L. Acidophilus, Bifidus, L. Casei, L. Rhamnosus)",
    misleadingClaims: [],
    nutrients: [
      { name: "Protein", value: "22g", percentage: 44 },
      { name: "Fat", value: "2g", percentage: 3 },
      { name: "Carbs", value: "5g", percentage: 2 },
      { name: "Calcium", value: "250mg", percentage: 25 },
    ],
    additives: [
      {
        name: "None",
        effect: "No artificial additives present",
        safety: 'safe'
      }
    ],
    servingAnalysis: {
      listed: "185g",
      actual: "185g",
      manipulation: false
    },
    description: "This premium organic plain Greek yogurt is made with 100% organic milk from pasture-raised cows. With 22g of protein per serving and absolutely no additives or preservatives, it's an excellent choice for those seeking clean nutrition. The high protein content supports muscle recovery, while the creamy texture makes it versatile for both sweet and savory applications. Enjoy it plain, with fruit, or as a healthier substitute for sour cream in recipes.",
    benefits: [
      "Contains 6 live and active cultures for gut health",
      "Excellent source of calcium and vitamin D",
      "No added sugars - naturally low glycemic index",
      "Rich, creamy texture with a clean, tangy flavor profile",
      "Certified USDA Organic and Non-GMO Project Verified"
    ],
    certifications: ["USDA Organic", "Non-GMO Project Verified", "Animal Welfare Approved"],
    nutritionalHighlights: "This yogurt contains twice the protein of regular yogurt, making it an excellent choice for active individuals. It's also naturally low in carbs and contains beneficial probiotics that support gut health and immune function."
  },
  '102': {
    id: '102',
    name: "Steel Cut Oats",
    brand: "Heritage Grains",
    healthScore: 90,
    letter: "A",
    category: "Breakfast",
    status: 'safe',
    image: "https://images.unsplash.com/photo-1495078068497-7947c38c27a3?auto=format&fit=crop&q=80&w=1000",
    ingredients: "100% Whole Grain Steel Cut Oats",
    misleadingClaims: [],
    nutrients: [
      { name: "Protein", value: "7g", percentage: 14 },
      { name: "Fiber", value: "5g", percentage: 20 },
      { name: "Carbs", value: "27g", percentage: 9 },
      { name: "Iron", value: "2mg", percentage: 11 },
    ],
    additives: [
      {
        name: "None",
        effect: "No artificial additives present",
        safety: 'safe'
      }
    ],
    servingAnalysis: {
      listed: "40g",
      actual: "40g",
      manipulation: false
    },
    description: "Heritage Grains Steel Cut Oats are minimally processed whole grain oats that have been cut into pieces rather than rolled. This minimal processing preserves more of the natural nutrients and results in a chewier, nuttier oatmeal. These oats are 100% whole grain with no additives or preservatives, making them an excellent source of sustained energy and dietary fiber. Steel cut oats have a lower glycemic index than quick oats, providing longer-lasting fullness and more stable blood sugar levels.",
    benefits: [
      "High in soluble fiber which helps lower cholesterol",
      "Provides sustained energy release through the morning",
      "Naturally gluten-free (processed in a dedicated facility)",
      "Rich source of antioxidants and phytonutrients",
      "Contains avenanthramides, anti-inflammatory compounds unique to oats"
    ],
    certifications: ["Whole Grain Certified", "Non-GMO Project Verified", "Gluten-Free Certified"],
    nutritionalHighlights: "Steel cut oats contain beta-glucan, a unique type of soluble fiber that has been shown to reduce LDL cholesterol levels. They also provide a good source of manganese, phosphorus, and magnesium, supporting bone health and metabolic function."
  },
  '103': {
    id: '103',
    name: "Sprouted Grain Bread",
    brand: "VitalBake",
    healthScore: 85,
    letter: "A-",
    category: "Bakery",
    status: 'safe',
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&q=80&w=1000",
    ingredients: "Organic Sprouted Wheat, Filtered Water, Organic Sprouted Barley, Organic Sprouted Millet, Organic Malted Barley, Organic Sprouted Lentils, Organic Sprouted Soybeans, Organic Sprouted Spelt, Sea Salt",
    misleadingClaims: [
      {
        claim: "Lower Carb Option",
        reality: "While nutritionally superior to white bread, it contains similar carbohydrate content to other whole grain breads.",
        severity: 'low'
      }
    ],
    nutrients: [
      { name: "Protein", value: "5g", percentage: 10 },
      { name: "Fiber", value: "3g", percentage: 12 },
      { name: "Carbs", value: "15g", percentage: 5 },
      { name: "Iron", value: "1mg", percentage: 6 },
    ],
    additives: [
      {
        name: "None",
        effect: "No artificial additives present",
        safety: 'safe'
      }
    ],
    servingAnalysis: {
      listed: "34g (1 slice)",
      actual: "34g",
      manipulation: false
    },
    description: "VitalBake Sprouted Grain Bread is made from organic sprouted whole grains and legumes. The sprouting process naturally increases the bioavailability of nutrients, making them easier to digest and absorb. This bread is made without flour, using only sprouted whole grains, water, and sea salt. It's a living food, preservative-free and packed with essential amino acids, vitamins, and minerals.",
    benefits: [
      "Higher protein content than traditional bread",
      "Sprouting reduces phytic acid, making minerals more bioavailable",
      "Contains all essential amino acids from the combination of grains and legumes",
      "Lower glycemic index than traditional bread",
      "Free from oils, added sweeteners, and preservatives"
    ],
    certifications: ["USDA Organic", "Non-GMO Project Verified", "Vegan Certified"],
    nutritionalHighlights: "The sprouting process activates enzymes that break down starch and protein, essentially pre-digesting the grains. This results in increased vitamin content (especially B vitamins) and improved mineral absorption. The combined grains and legumes provide a complete protein source."
  }
};

export type Product = {
  id: string;
  name: string;
  healthScore: number;
  status: 'safe' | 'moderate' | 'unsafe';
  image: string;
  brand: string;
  letter: string;
  category: string;
  ingredients: string;
  misleadingClaims: {
    claim: string;
    reality: string;
    severity: 'high' | 'medium' | 'low';
  }[];
  nutrients: {
    name: string;
    value: string;
    percentage: number;
  }[];
  additives: {
    name: string;
    effect: string;
    safety: 'safe' | 'moderate' | 'unsafe';
  }[];
  servingAnalysis: {
    listed: string;
    actual: string;
    manipulation: boolean;
  };
  description?: string;
  benefits?: string[];
  certifications?: string[];
  nutritionalHighlights?: string;
};


import React from 'react';
import { motion } from 'framer-motion';
import { Scan, ShieldCheck, Zap, BarChart4 } from 'lucide-react';

const features = [
  {
    icon: Scan,
    title: 'Instant Scanning',
    description: 'Quickly scan any food product barcode to get detailed nutritional information in seconds.',
    color: 'from-green-500/20 to-emerald-500/5',
  },
  {
    icon: ShieldCheck,
    title: 'Ingredient Safety',
    description: 'Identify potentially harmful additives and allergens that may affect your health.',
    color: 'from-blue-500/20 to-cyan-500/5',
  },
  {
    icon: BarChart4,
    title: 'Nutritional Analysis',
    description: 'Get a breakdown of calories, macronutrients, vitamins, and minerals for informed choices.',
    color: 'from-orange-500/20 to-amber-500/5',
  },
  {
    icon: Zap,
    title: 'Health Score',
    description: 'Understand at a glance how a product fits into your personal health goals.',
    color: 'from-purple-500/20 to-pink-500/5',
  },
];

const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Making Healthy Choices Simple
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our powerful scanning technology helps you understand exactly what's in your food,
            so you can make better decisions for your health.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative rounded-2xl p-6 border"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-40`} />
              
              <div className="relative z-10">
                <div className="p-3 bg-white rounded-xl inline-block shadow-sm mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;

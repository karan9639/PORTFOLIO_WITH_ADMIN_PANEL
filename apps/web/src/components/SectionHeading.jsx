import { motion } from 'framer-motion';

export default function SectionHeading({ kicker, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="mx-auto mb-14 max-w-3xl text-center"
    >
      {kicker ? <div className="section-kicker">{kicker}</div> : null}
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">{description}</p> : null}
    </motion.div>
  );
}

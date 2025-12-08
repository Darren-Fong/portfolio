'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            About Me
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="card">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                I'm a dedicated student with a passion for technology and innovation. My journey in the world of 
                technology has been driven by curiosity and a desire to create meaningful solutions to real-world problems.
              </p>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Throughout my academic journey, I've participated in various competitions, earned certifications, 
                and worked on diverse projects that have helped me develop both technical and soft skills. I'm 
                constantly learning and exploring new technologies to expand my knowledge and capabilities.
              </p>
              
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Beyond academics, I'm actively involved in organizations and initiatives that align with my interests 
                and values. I believe in continuous growth, collaboration, and making a positive impact in my community.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

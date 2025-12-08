'use client'

import { motion } from 'framer-motion'
import { 
  FaReact, FaPython, FaJsSquare, FaSwift, FaGitAlt, 
  FaNodeJs, FaHtml5, FaCss3Alt, FaDatabase, FaApple 
} from 'react-icons/fa'
import { 
  SiTypescript, SiNextdotjs, SiTailwindcss, SiFirebase, 
  SiMongodb, SiPostgresql, SiFlask, SiSwift 
} from 'react-icons/si'

interface Skill {
  name: string
  icon: React.ReactNode
  level: number
}

interface SkillCategory {
  category: string
  skills: Skill[]
}

export default function Skills() {
  const skillCategories: SkillCategory[] = [
    {
      category: 'Web Development',
      skills: [
        { name: 'React', icon: <FaReact />, level: 90 },
        { name: 'Next.js', icon: <SiNextdotjs />, level: 85 },
        { name: 'TypeScript', icon: <SiTypescript />, level: 85 },
        { name: 'JavaScript', icon: <FaJsSquare />, level: 90 },
        { name: 'HTML5', icon: <FaHtml5 />, level: 95 },
        { name: 'CSS3', icon: <FaCss3Alt />, level: 90 },
        { name: 'Tailwind CSS', icon: <SiTailwindcss />, level: 88 },
        { name: 'Node.js', icon: <FaNodeJs />, level: 80 },
      ],
    },
    {
      category: 'iOS Development',
      skills: [
        { name: 'Swift', icon: <FaSwift />, level: 85 },
        { name: 'SwiftUI', icon: <SiSwift />, level: 80 },
        { name: 'Xcode', icon: <FaApple />, level: 82 },
      ],
    },
    {
      category: 'Backend & Database',
      skills: [
        { name: 'Python', icon: <FaPython />, level: 88 },
        { name: 'Flask', icon: <SiFlask />, level: 75 },
        { name: 'MongoDB', icon: <SiMongodb />, level: 78 },
        { name: 'PostgreSQL', icon: <SiPostgresql />, level: 80 },
        { name: 'Firebase', icon: <SiFirebase />, level: 82 },
      ],
    },
    {
      category: 'Tools & Others',
      skills: [
        { name: 'Git', icon: <FaGitAlt />, level: 85 },
        { name: 'SQL', icon: <FaDatabase />, level: 80 },
      ],
    },
  ]

  return (
    <section id="skills" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Skills & Technologies
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Technologies and tools I work with to build amazing projects.
          </p>
          
          <div className="space-y-12">
            {skillCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  {category.category}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: skillIndex * 0.05 }}
                      viewport={{ once: true }}
                      className="card"
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div className="text-4xl text-primary">
                          {skill.icon}
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {skill.name}
                          </h4>
                        </div>
                        <span className="text-primary font-bold">
                          {skill.level}%
                        </span>
                      </div>
                      
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <motion.div
                          className="bg-gradient-to-r from-primary to-secondary h-2.5 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: skillIndex * 0.05 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, Calendar, MapPin } from 'lucide-react'
import FullScreenBackground from './FullScreenBackground'

const experiences = [
  {
    id: 1,
    title: 'Jr. Java Developer',
    company: 'Ftechiz Solutions Pvt Ltd',
    location: 'Dehradun, Uttarakhand',
    type: 'Full-time',
    period: 'September 2024 – Present',
    description: 'Developed and maintained Java-based applications, utilizing Spring Boot and REST APIs for backend development.',
    achievements: [
      'Developed and maintained Java-based applications using Spring Boot',
      'Created RESTful APIs for seamless client-server integration',
      'Used Git for version control in collaborative projects',
      'Integrated Android Studio for mobile application development',
      'Collaborated with cross-functional teams to deliver high-quality solutions',
    ],
  },
  {
    id: 2,
    title: 'Data Science Intern',
    company: 'Unified Mentor Pvt. Ltd.',
    location: 'Gurugram, Delhi',
    type: 'Internship',
    period: 'April 2024 – August 2024',
    description: 'Gained hands-on experience in machine learning and data analysis through real-world projects.',
    achievements: [
      'Applied machine learning algorithms to practical problems',
      'Enhanced predictive accuracy in data models',
      'Delivered data-driven insights for business solutions',
    ],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <FullScreenBackground 
      imageSrc="/images/backgrounds/baseball-character.png"
      overlay="dark"
      parallax={true}
    >
      <section
        id="experience"
        ref={ref}
        className="min-h-screen py-20 px-4 relative"
      >
        <div className="container mx-auto max-w-5xl">
        <motion.h2
          className="text-5xl md:text-7xl font-heading font-bold text-spidey-red mb-4 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          HERO'S JOURNEY
        </motion.h2>

        <motion.p
          className="text-xl text-gray-light text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          My professional adventures in the tech world
        </motion.p>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="relative bg-gray-dark/50 backdrop-blur-sm border-2 border-gray-700 rounded-lg p-6 md:p-8 hover:border-spidey-red transition-all duration-300"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(220, 38, 38, 0.3)' }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-5 h-5 text-spidey-red" />
                    <h3 className="text-2xl font-heading font-bold text-spidey-red">
                      {exp.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-3">
                    <span className="font-mono font-semibold text-gray-light">{exp.company}</span>
                    <span className="hidden md:inline">⋄</span>
                    <span className="flex items-center gap-1 text-sm">
                      <MapPin size={14} />
                      {exp.location}
                    </span>
                    <span className="hidden md:inline">⋄</span>
                    <span className="text-sm bg-spidey-red/20 px-2 py-1 rounded border border-spidey-red">
                      {exp.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                    <Calendar size={14} />
                    <span className="font-mono">{exp.period}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 mb-4">{exp.description}</p>

              <div>
                <h4 className="text-lg font-heading font-semibold text-spidey-red mb-3">
                  Key Achievements:
                </h4>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-start gap-2 text-gray-400 text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.2 + (idx + 1) * 0.1 }}
                    >
                      <span className="text-spidey-red mt-1">▸</span>
                      <span>{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </section>
    </FullScreenBackground>
  )
}

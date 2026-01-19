import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import FullScreenBackground from './FullScreenBackground'
import SectionIntro from './SectionIntro'
import ScrollReveal from './ScrollReveal'
import DoubleText from './DoubleText'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const formRef = useRef(null)
  const [status, setStatus] = useState({ type: null, message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: null, message: '' })

    try {
      const result = await emailjs.sendForm(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        formRef.current,
        'YOUR_PUBLIC_KEY'
      )

      setStatus({
        type: 'success',
        message: 'Message sent! Mission accomplished! 🕷️',
      })
      formRef.current?.reset()
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or use the email directly.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <FullScreenBackground 
      imageSrc="/images/backgrounds/spiderman-city-swing.png"
      overlay="red"
      parallax={true}
    >
      <section
        id="contact"
        ref={ref}
        className="min-h-screen py-20 px-4 relative flex items-center"
      >
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-gray-dark/50 backdrop-blur-sm border-2 border-spidey-red rounded-lg p-8 md:p-12"
          >
            <div className="mb-12">
              <SectionIntro
                eyebrow="S E C T I O N  0 6  •  C O N T A C T"
                title="CALL FOR BACKUP"
                subtitle="Ready to team up? Send me a web message."
                isInView={isInView}
              />
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <ScrollReveal delay={0.2} direction="left" distance={30}>
                <div>
                  <label htmlFor="name" className="block text-gray-light mb-2 font-mono">
                    Your Hero Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="from_name"
                    required
                    className="w-full px-4 py-3 bg-black/50 border-2 border-gray-700 rounded-lg text-gray-light focus:border-spidey-red focus:outline-none transition-colors font-mono"
                    placeholder="Enter your name"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3} direction="left" distance={30}>
                <div>
                  <label htmlFor="email" className="block text-gray-light mb-2 font-mono">
                    Communication Device
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="from_email"
                    required
                    className="w-full px-4 py-3 bg-black/50 border-2 border-gray-700 rounded-lg text-gray-light focus:border-spidey-red focus:outline-none transition-colors font-mono"
                    placeholder="your.email@example.com"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.4} direction="left" distance={30}>
                <div>
                  <label htmlFor="subject" className="block text-gray-light mb-2 font-mono">
                    Mission Type
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 bg-black/50 border-2 border-gray-700 rounded-lg text-gray-light focus:border-spidey-red focus:outline-none transition-colors font-mono"
                    placeholder="What's the mission?"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.5} direction="left" distance={30}>
                <div>
                  <label htmlFor="message" className="block text-gray-light mb-2 font-mono">
                    Mission Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-black/50 border-2 border-gray-700 rounded-lg text-gray-light focus:border-spidey-red focus:outline-none transition-colors resize-none font-mono"
                    placeholder="Tell me about your project or collaboration opportunity..."
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.6} direction="up" distance={20}>
                <div className="flex justify-center">
                  <DoubleText
                    text={loading ? 'Sending Web...' : 'Send Web Message'}
                    as="button"
                    type="submit"
                    disabled={loading}
                    className="web-button flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={undefined}
                  />
                </div>
              </ScrollReveal>

              {status.type && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-4 rounded-lg flex items-center gap-3 ${
                    status.type === 'success'
                      ? 'bg-green-900/30 border-2 border-green-500 text-green-400'
                      : 'bg-red-900/30 border-2 border-red-500 text-red-400'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle size={24} />
                  ) : (
                    <AlertCircle size={24} />
                  )}
                  <p className="font-mono">{status.message}</p>
                </motion.div>
              )}
            </form>

            <motion.div
              className="mt-8 text-center text-gray-400 text-sm font-mono"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <p>Or reach out directly at: vivek5832017@gmail.com</p>
              <p className="mt-2">Phone: +91 8171152213</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </FullScreenBackground>
  )
}


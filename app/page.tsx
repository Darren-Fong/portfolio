import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Competitions from '@/components/sections/Competitions'
import Education from '@/components/sections/Education'
import Skills from '@/components/sections/Skills'
import Organizations from '@/components/sections/Organizations'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Competitions />
      <Education />
      <Skills />
      <Organizations />
      <Contact />
    </>
  )
}

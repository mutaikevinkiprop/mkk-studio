import { Hero } from '@/components/sections/Hero'
import { Manifesto } from '@/components/sections/Manifesto'
import { Services } from '@/components/sections/Services'
import { SelectedWork } from '@/components/sections/SelectedWork'
import { HorizontalShowcase } from '@/components/sections/HorizontalShowcase'
import { CTA } from '@/components/sections/CTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Services />
      <SelectedWork />
      <HorizontalShowcase />
      <CTA />
    </>
  )
}

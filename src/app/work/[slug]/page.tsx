import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { projects, getProjectBySlug } from '@/data/projects';
import TechnicalStamp from '@/components/ui/TechnicalStamp';
import SectionHeader from '@/components/ui/SectionHeader';
import ScrollReveal from '@/components/ui/ScrollReveal';

export async function generateStaticParams() {
  const slugs: string[] = [];
  projects.forEach((p) => {
    slugs.push(p.slug);
    if (p.slug === 'pattern-making') slugs.push('pattern-making-and-garment-construction');
    if (p.slug === 'athleisure') slugs.push('athleisure-wear');
    if (p.slug === 'apparel-merchandising') slugs.push('apparel-merchandising-and-production');
  });
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <article className="pt-28 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Top Back Breadcrumb */}
      <div className="pb-8 mb-8 border-b border-[#161616]/10 flex items-center justify-between">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#161616]/70 hover:text-[#A95F45] uppercase transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO ALL PROJECTS</span>
        </Link>

        <div className="flex items-center gap-2">
          <TechnicalStamp label="PROJECT" value={project.projectNumber} variant="clay" />
          <span className="font-mono text-xs text-[#161616]/60">{project.date}</span>
        </div>
      </div>

      {/* 01 — COVER & PROJECT HERO */}
      <header className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <span className="font-mono text-xs tracking-[0.25em] text-[#A95F45] uppercase font-semibold block mb-3">
              {project.category}
            </span>
            <h1 className="font-editorial-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#161616] font-normal tracking-tight leading-[1.05]">
              {project.title}
            </h1>
            {project.subtitle && (
              <p className="font-editorial-serif text-2xl sm:text-3xl text-[#161616]/70 italic mt-3 font-light">
                {project.subtitle}
              </p>
            )}
            <p className="font-sans text-base sm:text-lg text-[#4A4A4A] mt-6 max-w-3xl font-light leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Quick Technical Specs Block */}
          <div className="lg:col-span-4 bg-[#FAF7F2] p-5 border border-[#161616]/10 space-y-3 font-mono text-xs">
            <div>
              <span className="text-[10px] text-[#161616]/40 tracking-widest uppercase block">
                YEAR & TIMELINE
              </span>
              <span className="font-semibold text-[#161616]">{project.date}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#161616]/40 tracking-widest uppercase block">
                INTEGRATED DISCIPLINES
              </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {project.disciplines.map((d) => (
                  <span key={d} className="px-1.5 py-0.5 bg-[#E5D8C8]/60 text-[10px] text-[#161616]">
                    {d}
                  </span>
                ))}
              </div>
            </div>
            {project.materialsUsed && (
              <div>
                <span className="text-[10px] text-[#161616]/40 tracking-widest uppercase block">
                  KEY MATERIALS
                </span>
                <span className="text-[#161616] text-[11px] leading-tight block mt-0.5">
                  {project.materialsUsed.join(' · ')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="relative aspect-[16/9] w-full my-10 bg-[#FAF7F2] border border-[#161616]/15 overflow-hidden shadow-sm">
          <Image
            src={project.heroImage || project.coverImage}
            alt={project.heroImageAlt || project.title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover object-center"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-[#161616]/85 backdrop-blur-sm text-[#FAF7F2] p-3 max-w-xl text-xs font-mono">
            <span>{project.heroImageAlt || project.title}</span>
          </div>
        </div>
      </header>

      {/* 02 — THE BRIEF & 03 — RESEARCH */}
      {(project.brief || project.research) && (
        <section className="py-14 border-t border-[#161616]/10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {project.brief && (
              <div className="md:col-span-6">
                <TechnicalStamp label="02" value="THE BRIEF" variant="sand" />
                <h3 className="font-editorial-serif text-2xl sm:text-3xl text-[#161616] font-normal mt-4 mb-3">
                  Project Challenge & Objectives
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#4A4A4A] leading-relaxed font-light">
                  {project.brief}
                </p>
              </div>
            )}

            {project.research && (
              <div className="md:col-span-6">
                <TechnicalStamp label="03" value="RESEARCH" variant="sand" />
                <h3 className="font-editorial-serif text-2xl sm:text-3xl text-[#161616] font-normal mt-4 mb-3">
                  Archival & Structural Study
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#4A4A4A] leading-relaxed font-light">
                  {project.research}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 04 — INSPIRATION & 05 — MATERIAL */}
      {(project.inspiration || project.materials) && (
        <section className="py-14 border-t border-[#161616]/10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {project.inspiration && (
              <div className="md:col-span-6">
                <TechnicalStamp label="04" value="INSPIRATION" variant="sand" />
                <h3 className="font-editorial-serif text-2xl sm:text-3xl text-[#161616] font-normal mt-4 mb-3">
                  Cultural & Conceptual Sources
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#4A4A4A] leading-relaxed font-light">
                  {project.inspiration}
                </p>
              </div>
            )}

            {project.materials && (
              <div className="md:col-span-6">
                <TechnicalStamp label="05" value="MATERIALITY" variant="sand" />
                <h3 className="font-editorial-serif text-2xl sm:text-3xl text-[#161616] font-normal mt-4 mb-3">
                  Material Behavior & Palette
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#4A4A4A] leading-relaxed font-light">
                  {project.materials}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 06 — EXPERIMENTATION, 07 — DEVELOPMENT, 08 — CONSTRUCTION (STAGES) */}
      {project.stages && project.stages.length > 0 && (
        <section className="py-16 border-t border-[#161616]/10">
          <SectionHeader
            stamp="METHODOLOGY"
            stampValue="PROCESS STAGES"
            title="Development, Construction & Iteration"
            subtitle="Chronological progression from initial draping to structural assembly and surface needlework."
          />

          <div className="space-y-16">
            {project.stages.map((stage, idx) => (
              <ScrollReveal key={stage.id} delay={idx * 0.1} direction="up">
                <div className="bg-[#FAF7F2] border border-[#161616]/15 p-6 md:p-10">
                  <div className="flex items-center gap-3 pb-4 border-b border-[#161616]/10 mb-6">
                    <span className="font-mono text-sm font-semibold text-[#A95F45]">
                      STAGE {stage.number}
                    </span>
                    <span className="text-[#161616]/30">/</span>
                    <h4 className="font-editorial-serif text-2xl sm:text-3xl text-[#161616] font-normal">
                      {stage.name}
                    </h4>
                  </div>

                  <p className="font-sans text-sm sm:text-base text-[#4A4A4A] leading-relaxed font-light mb-8 max-w-4xl">
                    {stage.description}
                  </p>

                  {/* Stage Images Grid */}
                  {stage.images && stage.images.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                      {stage.images.map((img, i) => (
                        <div key={i} className="bg-[#E5D8C8]/40 border border-[#161616]/10 p-2">
                          <div className="relative aspect-[4/3] w-full overflow-hidden">
                            <Image
                              src={img.src}
                              alt={img.alt}
                              fill
                              sizes="(max-width: 768px) 100vw, 500px"
                              className="object-cover object-center"
                            />
                          </div>
                          {img.caption && (
                            <p className="mt-2 font-mono text-[11px] text-[#161616]/70 px-1">
                              {img.caption}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Stage Technical Notes */}
                  {stage.notes && stage.notes.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-[#161616]/10 flex flex-wrap gap-4">
                      {stage.notes.map((note, nIdx) => (
                        <div key={nIdx} className="flex items-center gap-2 text-xs font-mono text-[#161616]/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#A95F45]" />
                          <span>{note}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* 09 — FINAL RESULT & 10 — REFLECTION */}
      {(project.finalResult || project.reflection) && (
        <section className="py-14 border-t border-[#161616]/10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {project.finalResult && (
              <div className="md:col-span-6">
                <TechnicalStamp label="09" value="FINAL RESULT" variant="clay" />
                <h3 className="font-editorial-serif text-2xl sm:text-3xl text-[#161616] font-normal mt-4 mb-3">
                  Garment Realization
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#4A4A4A] leading-relaxed font-light">
                  {project.finalResult}
                </p>
              </div>
            )}

            {project.reflection && (
              <div className="md:col-span-6">
                <TechnicalStamp label="10" value="REFLECTION" variant="sand" />
                <h3 className="font-editorial-serif text-2xl sm:text-3xl text-[#161616] font-normal mt-4 mb-3">
                  Designer Reflection
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#4A4A4A] leading-relaxed font-light">
                  {project.reflection}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-16 border-t border-[#161616]/10">
          <SectionHeader
            stamp="VISUAL ARCHIVE"
            stampValue="PROJECT DETAILS"
            title="Garment & Construction Gallery"
            subtitle="Close-up documentation of seam finishes, embroidery detail, and silhouette draping."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {project.gallery.map((item, gIdx) => (
              <div
                key={gIdx}
                className="group bg-[#FAF7F2] p-2 border border-[#161616]/10 hover:border-[#A95F45]/50 transition-all"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-[#E5D8C8]/40">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 300px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {item.title && (
                  <p className="mt-2 font-mono text-[10px] text-[#161616]/70 tracking-wider truncate uppercase">
                    {item.title}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Next / Previous Project Navigation Bar */}
      <footer className="mt-20 pt-10 border-t border-[#161616]/15">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href={`/work/${prevProject.slug}`}
            className="group p-6 bg-[#FAF7F2] border border-[#161616]/10 hover:border-[#A95F45] transition-all flex flex-col justify-between"
          >
            <span className="font-mono text-[10px] text-[#161616]/50 tracking-widest uppercase flex items-center gap-1">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              <span>PREVIOUS PROJECT ({prevProject.projectNumber})</span>
            </span>
            <h4 className="font-editorial-serif text-2xl text-[#161616] group-hover:text-[#A95F45] transition-colors mt-2">
              {prevProject.title}
            </h4>
          </Link>

          <Link
            href={`/work/${nextProject.slug}`}
            className="group p-6 bg-[#FAF7F2] border border-[#161616]/10 hover:border-[#A95F45] transition-all flex flex-col justify-between text-right"
          >
            <span className="font-mono text-[10px] text-[#161616]/50 tracking-widest uppercase flex items-center justify-end gap-1">
              <span>NEXT PROJECT ({nextProject.projectNumber})</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
            <h4 className="font-editorial-serif text-2xl text-[#161616] group-hover:text-[#A95F45] transition-colors mt-2">
              {nextProject.title}
            </h4>
          </Link>
        </div>
      </footer>
    </article>
  );
}

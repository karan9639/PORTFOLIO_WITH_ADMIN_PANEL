import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { DynamicIcon } from '../components/IconMap.jsx';
import LoadingScreen from '../components/LoadingScreen.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { useSiteData } from '../hooks/useSiteData.js';
import { useSubmitMessage } from '../hooks/useSubmitMessage.js';

const messageSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Tell me a little more about your project'),
});

function ChipList({ items = [], tone = 'default' }) {
  if (!items?.length) return null;
  const styles = tone === 'accent'
    ? 'border-teal-400/20 bg-teal-400/10 text-teal-100'
    : 'border-white/10 bg-white/5 text-slate-300';

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className={`rounded-full border px-3 py-1 text-xs ${styles}`}>
          {item}
        </span>
      ))}
    </div>
  );
}

function PairList({ title, items = [] }) {
  if (!items?.length) return null;
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="text-sm font-medium text-white">{title}</div>
      <div className="mt-4 space-y-3 text-sm">
        {items.map((item, index) => (
          <div key={`${item.label}-${index}`} className="flex items-center justify-between gap-4 border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
            <span className="text-slate-400">{item.label}</span>
            <span className="text-right text-slate-200">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero({ hero, profile, socialLinks }) {
  return (
    <section className="section-spacing overflow-hidden">
      <div className="container-shell grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="section-kicker">{hero?.badge || 'Open to work'}</div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {hero?.title}{' '}
            <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
              {hero?.highlightedName || profile?.fullName}
            </span>
          </motion.h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{hero?.description || profile?.tagline}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href={hero?.primaryCtaLink || '#projects'} className="rounded-full bg-teal-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-teal-300">
              {hero?.primaryCtaText || 'View projects'}
            </a>
            <a href={hero?.secondaryCtaLink || '#contact'} className="rounded-full border border-white/10 px-6 py-3 font-semibold text-slate-100 transition hover:border-teal-300/40 hover:text-teal-200">
              {hero?.secondaryCtaText || 'Contact me'}
            </a>
          </div>
          <ChipList items={hero?.supportingPoints} tone="accent" />
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-400">
            {(socialLinks || []).map((link) => (
              <a key={link._id} href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-teal-200">
                <DynamicIcon name={link.icon} className="h-4 w-4" /> {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-teal-400/20 to-cyan-400/10 blur-3xl" />
          <div className="glass-card relative overflow-hidden rounded-[2rem] p-5 shadow-soft">
            <img
              src={hero?.heroImageUrl || profile?.avatarUrl || '/assets/karan.svg'}
              alt={profile?.fullName || 'Portfolio owner'}
              className="h-[420px] w-full rounded-[1.5rem] object-cover"
            />
            <div className="absolute bottom-8 left-8 right-8 rounded-3xl border border-white/10 bg-slate-950/70 p-5 backdrop-blur-xl">
              <div className="text-xs uppercase tracking-[0.3em] text-teal-200">Current focus</div>
              <div className="mt-2 text-lg font-semibold text-white">{profile?.currentRole || profile?.headline}</div>
              <div className="mt-1 text-sm text-slate-400">{hero?.availabilityNote || profile?.availability}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats({ stats }) {
  if (!stats?.length) return null;
  return (
    <section className="pb-8">
      <div className="container-shell">
        <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-soft sm:grid-cols-3">
          {stats.map((item, index) => (
            <div key={`${item.label}-${index}`} className="rounded-2xl border border-white/5 bg-slate-900/60 p-5">
              <div className="text-2xl font-semibold text-white">{item.value}</div>
              <div className="mt-2 text-sm text-slate-400">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About({ about, profile }) {
  return (
    <section id="about" className="section-spacing">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-card overflow-hidden rounded-[2rem] p-4 shadow-soft">
          <img src={about?.profileImageUrl || profile?.avatarUrl || '/assets/kvs.svg'} alt="About visual" className="h-full min-h-[340px] w-full rounded-[1.5rem] object-cover" />
        </div>
        <div>
          <div className="section-kicker">About</div>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">{about?.heading}</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">{about?.summary}</p>
          <p className="mt-5 leading-8 text-slate-400">{about?.story}</p>
          <p className="mt-5 leading-8 text-slate-400">{about?.approach}</p>
          <ChipList items={about?.strengths} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {(about?.facts || []).map((item, index) => (
              <div key={`${item.label}-${index}`} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm text-slate-400">{item.label}</div>
                <div className="mt-1 font-medium text-white">{item.value}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <PairList title="Languages" items={profile?.languages} />
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-medium text-white">Currently learning</div>
              <ChipList items={profile?.currentlyLearning} />
              {about?.interests?.length ? (
                <>
                  <div className="mt-5 text-sm font-medium text-white">Interests</div>
                  <ChipList items={about.interests} />
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services({ services }) {
  return (
    <section id="services" className="section-spacing">
      <div className="container-shell">
        <SectionHeading kicker="Services" title="What I can help you build" description="From portfolios and dashboards to full-stack product experiences, I focus on systems that feel polished for users and maintainable for teams." />
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div key={service._id} className="glass-card rounded-[2rem] p-7 shadow-soft transition hover:-translate-y-1">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-400/15 text-teal-200">
                <DynamicIcon name={service.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">{service.title}</h3>
              <p className="mt-3 leading-7 text-slate-400">{service.description}</p>
              <ChipList items={service.deliverables} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills({ categories, profile }) {
  return (
    <section id="skills" className="section-spacing">
      <div className="container-shell">
        <SectionHeading kicker="Skills" title="A practical stack for shipping complete products" description="I enjoy working across the frontend-backend boundary, with a strong bias toward clean architecture and user-friendly interfaces." />
        {profile?.specializations?.length ? (
          <div className="mb-6 rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="text-sm font-medium text-white">Specializations</div>
            <ChipList items={profile.specializations} />
          </div>
        ) : null}
        <div className="grid gap-6 lg:grid-cols-3">
          {categories.map((category) => (
            <div key={category._id} className="glass-card rounded-[2rem] p-6 shadow-soft">
              <h3 className="text-xl font-semibold text-white">{category.name}</h3>
              <p className="mt-2 text-sm text-slate-400">{category.description}</p>
              <div className="mt-6 space-y-4">
                {(category.skills || []).map((skill) => (
                  <div key={skill._id}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-slate-200"><DynamicIcon name={skill.icon} className="h-4 w-4 text-teal-200" /> {skill.name}</span>
                      <span className="text-slate-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800">
                      <div className="h-2 rounded-full bg-gradient-to-r from-teal-300 to-cyan-400" style={{ width: `${skill.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects({ projects }) {
  return (
    <section id="projects" className="section-spacing">
      <div className="container-shell">
        <SectionHeading kicker="Projects" title="Selected work that reflects my style and engineering direction" description="Each project helped sharpen a different area of product development — from frontend execution and content structure to API integration and full-stack delivery." />
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <article key={project._id} className="glass-card overflow-hidden rounded-[2rem] shadow-soft">
              <img src={project.imageUrl || '/assets/karan.svg'} alt={project.title} className="h-64 w-full object-cover" />
              <div className="p-7">
                <div className="flex flex-wrap items-center gap-3">
                  {project.featured ? <span className="rounded-full bg-teal-400/15 px-3 py-1 text-xs font-medium text-teal-200">Featured</span> : null}
                  {project.year ? <span className="text-xs uppercase tracking-[0.3em] text-slate-500">{project.year}</span> : null}
                  {project.projectType ? <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">{project.projectType}</span> : null}
                  {project.status ? <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">{project.status}</span> : null}
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-white">{project.title}</h3>
                <p className="mt-3 leading-7 text-slate-400">{project.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(project.technologies || []).map((tech) => (
                    <span key={tech} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">{tech}</span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-4 text-sm">
                  <Link to={`/projects/${project.slug}`} className="font-semibold text-teal-200 transition hover:text-teal-100">Project details</Link>
                  {project.githubUrl ? <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-slate-300 transition hover:text-white">GitHub</a> : null}
                  {project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-slate-300 transition hover:text-white">Live demo</a> : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience({ experiences, education, certifications }) {
  return (
    <section id="experience" className="section-spacing">
      <div className="container-shell">
        <SectionHeading kicker="Journey" title="Professional growth, education, and proof of learning" description="A snapshot of the projects, academic milestones, and self-driven learning that shaped my engineering path." />
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            {experiences.map((item) => (
              <div key={item._id} className="glass-card rounded-[2rem] p-6 shadow-soft">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-[0.3em] text-teal-200">{item.company}</div>
                    <h3 className="mt-2 text-xl font-semibold text-white">{item.role}</h3>
                    <p className="mt-2 text-sm text-slate-400">{item.period} · {item.location}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.employmentType ? <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">{item.employmentType}</span> : null}
                    {item.current ? <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-200">Current</span> : null}
                  </div>
                </div>
                <p className="mt-4 leading-7 text-slate-400">{item.description}</p>
                <ChipList items={item.stack} />
                {!!item.highlights?.length && (
                  <ul className="mt-4 space-y-2 text-sm text-slate-300">
                    {item.highlights.map((highlight, index) => (
                      <li key={index} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-300" /> <span>{highlight}</span></li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <div className="space-y-6">
            <div className="glass-card rounded-[2rem] p-6 shadow-soft">
              <h3 className="text-xl font-semibold text-white">Education</h3>
              <div className="mt-5 space-y-4">
                {education.map((item) => (
                  <div key={item._id} className="rounded-2xl border border-white/10 p-4">
                    <div className="text-sm text-teal-200">{item.degree}</div>
                    <div className="mt-1 font-medium text-white">{item.institution}</div>
                    <div className="mt-1 text-sm text-slate-400">{item.field} · {item.period}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card rounded-[2rem] p-6 shadow-soft">
              <h3 className="text-xl font-semibold text-white">Certifications & learning</h3>
              <div className="mt-5 space-y-4">
                {certifications.map((item) => (
                  <div key={item._id} className="rounded-2xl border border-white/10 p-4">
                    <div className="font-medium text-white">{item.title}</div>
                    <div className="mt-1 text-sm text-slate-400">{item.issuer} · {item.issuedAt}</div>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
                    <ChipList items={item.skillsCovered} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Achievements({ achievements }) {
  return (
    <section className="section-spacing">
      <div className="container-shell">
        <SectionHeading kicker="Achievements" title="Signals of discipline, consistency, and technical curiosity" description="Achievements that support the story behind my work — problem solving, exams, and persistent learning." />
        <div className="grid gap-6 md:grid-cols-3">
          {achievements.map((item) => (
            <div key={item._id} className="glass-card rounded-[2rem] p-6 shadow-soft">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-400/15 text-teal-200">
                <DynamicIcon name={item.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 leading-7 text-slate-400">{item.description}</p>
              {item.dateLabel ? <div className="mt-4 text-sm text-slate-500">{item.dateLabel}</div> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ profile, contactInfo }) {
  const mutation = useSubmitMessage();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  const onSubmit = async (values) => {
    try {
      await mutation.mutateAsync(values);
      toast.success('Message sent successfully');
      reset();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Unable to send message');
    }
  };

  return (
    <section id="contact" className="section-spacing">
      <div className="container-shell grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="glass-card rounded-[2rem] p-8 shadow-soft">
          <div className="section-kicker">Contact</div>
          <h2 className="text-3xl font-semibold text-white">Let’s build something that feels premium.</h2>
          <p className="mt-4 leading-8 text-slate-400">{contactInfo?.intro || 'Send a message with your project idea, role, or collaboration opportunity.'}</p>
          <div className="mt-8 space-y-4 text-sm text-slate-300">
            <div>
              <div className="text-slate-500">Email</div>
              <a href={`mailto:${contactInfo?.email}`} className="mt-1 inline-block text-white transition hover:text-teal-200">{contactInfo?.email}</a>
            </div>
            <div>
              <div className="text-slate-500">Phone</div>
              <a href={`tel:${contactInfo?.phone || ''}`} className="mt-1 inline-block text-white transition hover:text-teal-200">{contactInfo?.phone || 'Available on request'}</a>
            </div>
            <div>
              <div className="text-slate-500">Location</div>
              <div className="mt-1 text-white">{contactInfo?.location}</div>
            </div>
            <div>
              <div className="text-slate-500">Availability</div>
              <div className="mt-1 text-white">{profile?.availability}</div>
            </div>
            {contactInfo?.preferredContactMethod ? (
              <div>
                <div className="text-slate-500">Preferred contact method</div>
                <div className="mt-1 text-white">{contactInfo.preferredContactMethod}</div>
              </div>
            ) : null}
            {contactInfo?.responseTime ? (
              <div>
                <div className="text-slate-500">Typical response time</div>
                <div className="mt-1 text-white">{contactInfo.responseTime}</div>
              </div>
            ) : null}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="glass-card rounded-[2rem] p-8 shadow-soft">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Name</label>
              <input {...register('name')} className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-teal-300/50" placeholder="Your name" />
              {errors.name ? <p className="mt-2 text-sm text-rose-300">{errors.name.message}</p> : null}
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Email</label>
              <input {...register('email')} className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-teal-300/50" placeholder="your@email.com" />
              {errors.email ? <p className="mt-2 text-sm text-rose-300">{errors.email.message}</p> : null}
            </div>
          </div>
          <div className="mt-5">
            <label className="mb-2 block text-sm text-slate-300">Subject</label>
            <input {...register('subject')} className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-teal-300/50" placeholder="What do you need help with?" />
          </div>
          <div className="mt-5">
            <label className="mb-2 block text-sm text-slate-300">Message</label>
            <textarea {...register('message')} rows="6" className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-teal-300/50" placeholder="Tell me about your project, role, or collaboration idea." />
            {errors.message ? <p className="mt-2 text-sm text-rose-300">{errors.message.message}</p> : null}
          </div>
          <button disabled={mutation.isPending} className="mt-6 rounded-full bg-teal-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-70">
            {mutation.isPending ? 'Sending…' : 'Send message'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default function HomePage() {
  const { data, isLoading } = useSiteData();
  const projects = useMemo(() => (data?.projects || []).sort((a, b) => Number(b.featured) - Number(a.featured)), [data]);

  if (isLoading) return <LoadingScreen />;

  return (
    <main>
      <Hero hero={data.hero} profile={data.profile} socialLinks={data.socialLinks} />
      <Stats stats={data.profile?.stats} />
      <About about={data.about} profile={data.profile} />
      <Services services={data.services || []} />
      <Skills categories={data.skillCategories || []} profile={data.profile} />
      <Projects projects={projects} />
      <Experience experiences={data.experiences || []} education={data.education || []} certifications={data.certifications || []} />
      <Achievements achievements={data.achievements || []} />
      <Contact profile={data.profile} contactInfo={data.contactInfo} />
    </main>
  );
}

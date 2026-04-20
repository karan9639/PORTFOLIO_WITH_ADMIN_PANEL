import { Link, useParams } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen.jsx';
import { useSiteData } from '../hooks/useSiteData.js';

function Chip({ children, tone = 'default' }) {
  const classes = tone === 'accent'
    ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200'
    : 'border-white/10 text-slate-300';

  return <span className={`rounded-full border px-3 py-1 text-sm ${classes}`}>{children}</span>;
}

export default function ProjectDetailsPage() {
  const { slug } = useParams();
  const { data, isLoading } = useSiteData();

  if (isLoading) return <LoadingScreen />;

  const project = (data?.projects || []).find((item) => item.slug === slug);

  if (!project) {
    return (
      <div className="container-shell py-24">
        <div className="glass-card rounded-[2rem] p-10 text-center shadow-soft">
          <h1 className="text-3xl font-semibold text-white">Project not found</h1>
          <p className="mt-4 text-slate-400">The project you’re looking for is not available.</p>
          <Link to="/" className="mt-6 inline-flex rounded-full bg-teal-400 px-6 py-3 font-semibold text-slate-950">Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="section-spacing">
      <div className="container-shell">
        <Link to="/" className="text-sm text-teal-200">← Back to portfolio</Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="section-kicker">Project spotlight</div>
            <h1 className="text-4xl font-semibold text-white">{project.title}</h1>
            <div className="mt-4 flex flex-wrap gap-3">
              {project.year ? <Chip>{project.year}</Chip> : null}
              {project.projectType ? <Chip>{project.projectType}</Chip> : null}
              {project.duration ? <Chip>{project.duration}</Chip> : null}
              {project.status ? <Chip tone="accent">{project.status}</Chip> : null}
            </div>
            <p className="mt-5 text-lg leading-8 text-slate-300">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {(project.technologies || []).map((tech) => (
                <Chip key={tech}>{tech}</Chip>
              ))}
            </div>
            {!!project.highlights?.length && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-white">Highlights</h2>
                <ul className="mt-4 space-y-3 text-slate-300">
                  {project.highlights.map((item, index) => (
                    <li key={index} className="flex gap-3"><span className="mt-2 h-2 w-2 rounded-full bg-teal-300" /> {item}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {project.role ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="text-sm text-slate-400">Role</div>
                  <div className="mt-2 text-white">{project.role}</div>
                </div>
              ) : null}
              {project.caseStudyUrl ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="text-sm text-slate-400">Case study</div>
                  <a href={project.caseStudyUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex text-teal-200 hover:text-teal-100">Open case study</a>
                </div>
              ) : null}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              {project.githubUrl ? <a href={project.githubUrl} target="_blank" rel="noreferrer" className="rounded-full bg-white px-6 py-3 font-semibold text-slate-950">GitHub</a> : null}
              {project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-6 py-3 font-semibold text-white">Live demo</a> : null}
            </div>
          </div>
          <div className="glass-card overflow-hidden rounded-[2rem] p-4 shadow-soft">
            <img src={project.imageUrl || '/assets/karan.svg'} alt={project.title} className="h-full min-h-[420px] w-full rounded-[1.5rem] object-cover" />
          </div>
        </div>
      </div>
    </main>
  );
}

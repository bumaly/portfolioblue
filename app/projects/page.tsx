import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';

const PROJECTS_QUERY = `*[_type == "project"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
  tags,
  body
}`;

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <img
          alt={value.alt || ' '}
          loading="lazy"
          src={urlForImage(value)?.url()}
        />
      );
    },
    videoEmbed: ({ value }: any) => {
      if (!value?.url) return null;
      let embedUrl = value.url;
      // Convert standard youtube URL to embed URL
      if (embedUrl.includes('youtube.com/watch?v=')) {
        embedUrl = embedUrl.replace('youtube.com/watch?v=', 'youtube.com/embed/');
      } else if (embedUrl.includes('youtu.be/')) {
        embedUrl = embedUrl.replace('youtu.be/', 'youtube.com/embed/');
      } else if (embedUrl.includes('vimeo.com/')) {
        embedUrl = embedUrl.replace('vimeo.com/', 'player.vimeo.com/video/');
      }
      return (
        <iframe
          className="video-embed"
          src={embedUrl}
          title="Video Player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }
  }
};

type Props = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Projects(props: Props) {
  const searchParams = props.searchParams ? await props.searchParams : {};
  const selectedSlug = typeof searchParams.slug === 'string' ? searchParams.slug : undefined;

  const projects = await client.fetch(PROJECTS_QUERY);
  const selectedProject = projects.find((p: any) => p.slug === selectedSlug);

  return (
    <>
      <section className="col col-2 col-scrollable">
        <header className="col-header">
          DIR /W /P PROJECTS
        </header>
        <div>
          {projects.length > 0 ? projects.map((p: any) => {
            const isActive = selectedSlug === p.slug;
            const imageUrl = p.mainImage ? urlForImage(p.mainImage)?.url() : null;
            
            return (
              <Link 
                key={p._id} 
                href={`/projects?slug=${p.slug}`} 
                style={{ display: 'block' }}
                scroll={false}
                data-nav
              >
                <div className={`project-list-item ${isActive ? 'active' : ''}`}>
                  <div className="project-list-info">
                    <div className="project-list-title">{p.slug.toUpperCase()}</div>
                    {p.publishedAt && (
                      <div className="project-list-date">
                        SIZE: {Math.floor(Math.random() * 200) + 50}KB &nbsp;&nbsp;DATE: {new Date(p.publishedAt).toISOString().split('T')[0].slice(2).replace(/-/g, '-')}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          }) : (
             <div style={{ padding: '23px', fontSize: '13px', opacity: 0.5 }}>NO PROJECTS FOUND IN CMS.</div>
          )}
        </div>
      </section>

      <section className="col col-3 col-scrollable">
        
        {selectedProject ? (
          <div className="content-pad">
            <div className="detail-meta">
              <h1 className="page-title">READING {selectedProject.slug.toUpperCase()}.TXT</h1>
              <div className="detail-tags">
                {selectedProject.tags?.map((tag: string) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
            <div className="detail-body">
              {selectedProject.body ? (
                <PortableText value={selectedProject.body} components={portableTextComponents} />
              ) : null}
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <pre className="ascii-art">
{`  \||/
  -  -
  /||\\`}
            </pre>
            <p>NO PROJECT SELECTED.</p>
            <p style={{ opacity: 0.5 }}>Select a file from the grid.</p>
          </div>
        )}
      </section>
    </>
  );
}

import Link from 'next/link';
import Image from 'next/image';
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <Image
          alt={value.alt || ' '}
          src={urlForImage(value)?.url() || ''}
          width={800}
          height={600}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      );
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectedProject = projects.find((p: any) => p.slug === selectedSlug);

  return (
    <>
      <section className="col col-2 col-scrollable">

        <div>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {projects.length > 0 ? projects.map((p: any) => {
            const isActive = selectedSlug === p.slug;
            
            return (
              <Link 
                key={p._id} 
                href={`/projects?slug=${p.slug}`} 
                style={{ display: 'block' }}
                scroll={false}
                data-nav
              >
                <div className={`project-list-item ${isActive ? 'active' : ''}`}>
                  <div className="project-list-title">{(p.title || p.slug).toUpperCase()}</div>
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
          <div>
            <div className="detail-meta">
              <h1 className="project-detail-title" style={{ marginBottom: 0 }}>{(selectedProject.title || selectedProject.slug).toUpperCase()}.TXT</h1>
              <div className="detail-tags">
                {selectedProject.tags?.filter((t: string) => t && t.trim() !== '').map((tag: string) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
            <div className="detail-body">
              {selectedProject.mainImage && (
                <Image 
                  src={urlForImage(selectedProject.mainImage)?.url() || ''} 
                  alt={selectedProject.title || 'Project main image'} 
                  width={800}
                  height={600}
                  style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto 32px auto' }}
                />
              )}
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

import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import ScrollReset from '@/components/ScrollReset';
import AppWindow from '@/components/AppWindow';

const PROJECTS_QUERY = `*[_type == "project"] | order(coalesce(publishedAt, _createdAt) desc) {
  _id,
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
  tags,
  body
}`;

const portableTextComponents = {
  marks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    link: ({ value, children }: any) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">{children}</a>
    ),
  },
  types: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      const maxWidth = value.size === 'small' ? '33%' : value.size === 'medium' ? '66%' : '100%';
      return (
        <Image
          alt={value.alt || ' '}
          src={urlForImage(value)?.url() || ''}
          width={800}
          height={600}
          style={{ maxWidth, height: 'auto', display: 'block', margin: '14px auto' }}
        />
      );
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    videoEmbed: ({ value }: any) => {
      if (!value?.url) return null;
      let embedUrl = value.url;
      if (embedUrl.includes('youtube.com/watch?v=')) embedUrl = embedUrl.replace('youtube.com/watch?v=', 'youtube.com/embed/');
      else if (embedUrl.includes('youtu.be/')) embedUrl = embedUrl.replace('youtu.be/', 'youtube.com/embed/');
      else if (embedUrl.includes('vimeo.com/')) embedUrl = embedUrl.replace('vimeo.com/', 'player.vimeo.com/video/');
      return (
        <iframe
          className="video-embed"
          src={embedUrl}
          title="Video Player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: '100%', aspectRatio: '16/9', border: '2px solid #808080', margin: '12px 0' }}
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
  const projects = await client.fetch(PROJECTS_QUERY, {}, { cache: 'no-store' });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectedProject = projects.find((p: any) => p.slug === selectedSlug);

  const statusLeft = `${projects.length} objects`;
  const statusRight = selectedProject
    ? (selectedProject.title || selectedProject.slug).toUpperCase()
    : 'No selection';

  return (
    <AppWindow title="PROJECTS.EXE — BOOLU" statusLeft={statusLeft} statusRight={statusRight}>
      <ScrollReset dep={selectedSlug} />
      <div className="win-split">
        {/* Left: project list */}
        <div className="win-split-left">
          {projects.length === 0 ? (
            <div style={{ padding: '12px', fontSize: '11px', color: '#808080' }}>No projects found.</div>
          ) : (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            projects.map((p: any, i: number) => (
              <Link key={p._id} href={`/projects?slug=${p.slug}`} scroll={false} style={{ display: 'block' }} data-nav>
                <div className={`win-list-item${selectedSlug === p.slug ? ' active' : ''}`}>
                  <span style={{ fontSize: '12px' }}>📄</span>
                  <span style={{ color: '#808080', flexShrink: 0 }}>[#{projects.length - 1 - i}]</span>
                  <span>{(p.title || p.slug).toUpperCase()}</span>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Right: project detail */}
        <div className="win-split-right">
          {selectedProject ? (
            <div>
              <div className="win-detail-header">
                <div className="win-detail-title">
                  📄 {(selectedProject.title || selectedProject.slug).toUpperCase()}
                </div>
                {selectedProject.tags?.filter((t: string) => t?.trim()).length > 0 && (
                  <div className="win-detail-tags">
                    {selectedProject.tags.filter((t: string) => t?.trim()).map((tag: string) => (
                      <span key={tag} className="win-tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="win-detail-body">
                {selectedProject.mainImage && (
                  <Image
                    src={urlForImage(selectedProject.mainImage)?.url() || ''}
                    alt={selectedProject.title || 'Project image'}
                    width={800}
                    height={600}
                    style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto 16px auto' }}
                  />
                )}
                {selectedProject.body && (
                  <PortableText value={selectedProject.body} components={portableTextComponents} />
                )}
              </div>
            </div>
          ) : (
            <div className="win-empty">
              <div style={{ fontSize: '24px' }}>📂</div>
              <div>No file selected.</div>
              <div style={{ fontSize: '11px' }}>Select a project from the list.</div>
            </div>
          )}
        </div>
      </div>
    </AppWindow>
  );
}

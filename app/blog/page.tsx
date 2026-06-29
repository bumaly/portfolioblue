import Link from 'next/link';
import Image from 'next/image';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { client } from '../../sanity/lib/client';
import { urlForImage } from '../../sanity/lib/image';
import ScrollReset from '@/components/ScrollReset';
import AppWindow from '@/components/AppWindow';

const ptComponents: PortableTextComponents = {
  marks: {
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">{children}</a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      const imageUrl = urlForImage(value)?.url();
      if (!imageUrl) return null;
      const maxWidth = value.size === 'small' ? '33%' : value.size === 'medium' ? '66%' : '100%';
      return (
        <Image
          alt={value.alt || 'Blog post image'}
          src={imageUrl}
          width={800}
          height={600}
          style={{
            maxWidth,
            height: 'auto',
            display: 'block',
            margin: '14px auto',
            border: '2px solid',
            borderColor: '#808080 #FFFFFF #FFFFFF #808080',
          }}
        />
      );
    },
  },
};

type Post = {
  _id: string;
  title: string;
  publishedAt: string;
  _createdAt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
  tags?: string[];
};

type Props = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

const shortDate = (iso: string) => iso.slice(2, 10)

export default async function Blog(props: Props) {
  const searchParams = props.searchParams ? await props.searchParams : {};
  const selectedId = typeof searchParams.id === 'string' ? searchParams.id : undefined;

  const posts: Post[] = await client.fetch('*[_type == "post"] | order(publishedAt desc, _createdAt desc)');
  const selectedPost = selectedId ? posts.find(p => p._id === selectedId) : undefined;

  const statusLeft = `${posts.length} entries`;
  const statusRight = selectedPost ? selectedPost.title : 'No entry selected';

  return (
    <AppWindow title="BLOG.TXT — BOOLU" statusLeft={statusLeft} statusRight={statusRight}>
      <ScrollReset dep={selectedId} />
      <div className="win-split">

        {/* Left: post list */}
        <div className="win-split-left">
          {posts.length === 0 ? (
            <div style={{ padding: '12px', fontSize: '11px', color: '#808080' }}>No posts found.</div>
          ) : (
            posts.map((p) => {
              const date = shortDate((p.publishedAt || p._createdAt).slice(0, 10));

              return (
                <Link key={p._id} href={`/blog?id=${p._id}`} scroll={false} style={{ display: 'block' }} data-nav>
                  <div className={`win-list-item win-list-item--blog${selectedId === p._id ? ' active' : ''}`}>
                    <span style={{ fontSize: '12px', flexShrink: 0 }}>📝</span>
                    <span className="win-list-label">{p.title}</span>
                    <span className="win-list-date">{date}</span>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Right: post detail */}
        <div className="win-split-right">
          {selectedPost ? (
            <div>
              <div className="win-detail-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px' }}>
                  <div className="win-detail-title" style={{ marginBottom: 0 }}>
                    📝 {selectedPost.title}
                  </div>
                  <div style={{ fontSize: '11px', color: '#808080', flexShrink: 0 }}>
                    {shortDate((selectedPost.publishedAt || selectedPost._createdAt).slice(0, 10))}
                  </div>
                </div>
                {selectedPost.tags && selectedPost.tags.filter((t: string) => t?.trim()).length > 0 && (
                  <div className="win-detail-tags">
                    {selectedPost.tags.filter((t: string) => t?.trim()).map((tag: string) => (
                      <span key={tag} className="win-tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="win-post-body">
                {selectedPost.body && <PortableText value={selectedPost.body} components={ptComponents} />}
              </div>
            </div>
          ) : (
            <div className="win-empty">
              <div style={{ fontSize: '24px' }}>📄</div>
              <div>No entry selected.</div>
              <div style={{ fontSize: '11px' }}>Select a log from the list.</div>
            </div>
          )}
        </div>

      </div>
    </AppWindow>
  );
}

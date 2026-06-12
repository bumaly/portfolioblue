import Link from 'next/link';
import Image from 'next/image';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { client } from '../../sanity/lib/client';
import { urlForImage } from '../../sanity/lib/image';
import ScrollReset from '@/components/ScrollReset';
const ptComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      const imageUrl = urlForImage(value)?.url();
      if (!imageUrl) {
        return null;
      }
      return (
        <Image
          alt={value.alt || 'Blog post image'}
          src={imageUrl}
          width={800}
          height={600}
          style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '2rem 0' }}
        />
      );
    },
  },
};

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  _createdAt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any;
  tags?: string[];
};

type Props = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Blog(props: Props) {
  // Wait for searchParams to resolve in Next 15+
  const searchParams = props.searchParams ? await props.searchParams : {};
  const selectedId = typeof searchParams.id === 'string' ? searchParams.id : undefined;

  const posts: Post[] = await client.fetch('*[_type == "post"] | order(publishedAt desc, _createdAt desc)');

  const selectedPost = selectedId ? posts.find(p => p._id === selectedId) : undefined;

  return (
    <>
      <ScrollReset dep={selectedId} />
      <section className="col col-2 col-scrollable">


        <div>
          {posts.map((p) => {
             const isActive = selectedId === p._id;
             const fullDate = p.publishedAt ? new Date(p.publishedAt).toISOString().split('T')[0] : new Date(p._createdAt).toISOString().split('T')[0];
             const displayDate = fullDate.substring(2);
             return (
               <Link 
                 key={p._id} 
                 href={`/blog?id=${p._id}`} 
                 style={{ display: 'block' }}
                 data-nav
                 scroll={false}
               >
                 <div className={`post-list-item ${isActive ? 'active' : ''}`}>
                  <div className="post-list-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexShrink: 0 }}>
                    <div className="post-list-date">{displayDate}</div>
                  </div>
                 </div>
               </Link>
             );
          })}
        </div>
      </section>

      <section className="col col-3">

        {selectedPost ? (
          <div>
            <div className="detail-meta">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '16px' }}>
                <h1 className="project-detail-title" style={{ marginBottom: 0 }}>{selectedPost.title}</h1>
                <div style={{ fontSize: '13px', opacity: 0.6, flexShrink: 0 }}>
                  {(selectedPost.publishedAt ? new Date(selectedPost.publishedAt).toISOString().split('T')[0] : new Date(selectedPost._createdAt).toISOString().split('T')[0]).substring(2)}
                </div>
              </div>
              {selectedPost.tags && selectedPost.tags.length > 0 && (
                <div className="detail-tags">
                  {selectedPost.tags.filter((t: string) => t && t.trim() !== '').map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="post-body">
              {selectedPost.body ? (
                <PortableText value={selectedPost.body} components={ptComponents} />
              ) : null}
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <pre className="ascii-art">
{`  \\||/
  -  -
  /||\\`}
            </pre>
            <p>NO LOG SELECTED.</p>
            <p style={{ opacity: 0.5 }}>Select a file from the list.</p>
          </div>
        )}
      </section>
    </>
  );
}

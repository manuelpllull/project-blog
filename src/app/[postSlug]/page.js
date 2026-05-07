import React, { cache } from 'react';

import BlogHero from '@/components/BlogHero';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { BLOG_TITLE } from '@/constants';
import MDX_COMPONENTS from '@/components/mdx/components';

import styles from './postSlug.module.css';

const cachedLoadBlogPost = cache(loadBlogPost);

export async function generateMetadata({ params }) {
  const { postSlug } = await params;

  try {
    const { frontmatter } = await cachedLoadBlogPost(postSlug);

    return {
      title: `${frontmatter.title} • ${BLOG_TITLE}`,
      description: frontmatter.abstract,
    };
  } catch (error) {
    return {
      title: BLOG_TITLE,
      description: 'A wonderful blog about JavaScript',
    };
  }
}

export default async function BlogPost({ params }) {
  const { postSlug } = await params;

  const { frontmatter, content } = await loadBlogPost(postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={new Date(frontmatter.publishedOn)}
      />
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={MDX_COMPONENTS}
        />
      </div>
    </article>
  );
}

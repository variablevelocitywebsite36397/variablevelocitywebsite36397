import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollObserver from "../../scroll-observer";

interface Props {
  params: Promise<{ slug: string }>;
}

function getPost(slug: string) {
  const file = path.join(process.cwd(), "content/posts", `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf-8");
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  const meta: Record<string, string> = {};
  if (match) {
    match[1].split("\n").forEach((line) => {
      const [key, ...rest] = line.split(":");
      if (key && rest.length) meta[key.trim()] = rest.join(":").trim().replace(/^['"]|['"]$/g, "");
    });
  }
  const body = raw.replace(/^---\n[\s\S]*?\n---\n*/, "");
  return {
    title: meta.title || slug,
    date: meta.date || "",
    excerpt: meta.excerpt || "",
    coverImage: meta.coverImage || "/logo.png",
    author: meta.author || "",
    body,
  };
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "content/posts");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(".mdx", "") }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <ScrollObserver />
      <header>
        <div className="nav">
          <Link href="/" className="brand">
            <div className="brand-mark">
              <img src="/logo.png" alt="Variable Velocity logo" />
            </div>
            <div className="brand-name">
              VARIABLE <span>VELOCITY</span>
            </div>
          </Link>
          <nav className="links">
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
          </nav>
        </div>
      </header>

      <main style={{ paddingTop: 120 }}>
        <article className="wrap" style={{ maxWidth: 720 }}>
          <div className="fade-in" style={{ marginBottom: 32 }}>
            <Link href="/blog" style={{ color: "var(--accent)", fontSize: 14 }}>
              &larr; Back to Blog
            </Link>
          </div>
          {post.coverImage && (
            <div className="fade-in" style={{ borderRadius: 12, overflow: "hidden", marginBottom: 32 }}>
              <img
                src={post.coverImage}
                alt={post.title}
                style={{ width: "100%", display: "block" }}
              />
            </div>
          )}
          <div className="section-head fade-in fade-in-delay-1" style={{ textAlign: "left" }}>
            <h1 style={{ fontSize: "2.4rem" }}>{post.title}</h1>
            <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 8 }}>
              {post.author && <>{post.author} &middot; </>}
              {post.date &&
                new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
            </p>
          </div>
          <div
            className="blog-content fade-in fade-in-delay-2"
            style={{ lineHeight: 1.8, fontSize: "1.05rem", color: "var(--text)" }}
          >
            {post.body.split("\n\n").map((para, i) => {
              const parts = para.split(/\*\*(.*?)\*\*/g);
              return (
                <p key={i}>
                  {parts.map((part, j) =>
                    j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                  )}
                </p>
              );
            })}
          </div>
        </article>
      </main>

      <footer>
        <div className="wrap foot-row">
          <div className="foot-note">© 2026 Variable Velocity — FTC Team 36397</div>
          <div className="foot-links">
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
          </div>
        </div>
      </footer>
    </>
  );
}

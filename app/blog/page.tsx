import fs from "fs";
import path from "path";
import Link from "next/link";
import ScrollObserver from "../scroll-observer";
import { asset } from "../asset-prefix";

interface PostMeta {
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  author: string;
  slug: string;
}

function getPosts(): PostMeta[] {
  const dir = path.join(process.cwd(), "content/posts");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf-8");
      const match = raw.match(/^---\n([\s\S]*?)\n---/);
      const meta: Record<string, string> = {};
      if (match) {
        match[1].split("\n").forEach((line) => {
          const [key, ...rest] = line.split(":");
          if (key && rest.length) meta[key.trim()] = rest.join(":").trim().replace(/^['"]|['"]$/g, "");
        });
      }
      return {
        title: meta.title || f.replace(".mdx", ""),
        date: meta.date || "",
        excerpt: meta.excerpt || "",
        coverImage: asset(meta.coverImage || "/logo.png"),
        author: meta.author || "",
        slug: f.replace(".mdx", ""),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function BlogPage() {
  const posts = getPosts();

  return (
    <>
      <ScrollObserver />
      <header>
        <div className="nav">
          <Link href="/" className="brand">
            <div className="brand-mark">
              <img src={asset("/logo.png")} alt="Variable Velocity logo" />
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
        <section>
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow fade-in">Blog</span>
              <h2 className="fade-in fade-in-delay-1">Latest Updates</h2>
              <p className="fade-in fade-in-delay-2">
                News, build updates, and stories from the Variable Velocity team.
              </p>
            </div>
            <div className="blog-grid">
              {posts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={`blog-card fade-in fade-in-delay-${Math.min(i + 1, 7)}`}
                  style={{ display: "block" }}
                >
                  <div className="blog-card-img">
                    <img src={post.coverImage} alt={post.title} />
                  </div>
                  <div className="blog-card-body">
                    <div className="date">
                      {post.date ? new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }) : ""}
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap foot-row">
          <div className="foot-note">© 2026 Variable Velocity — FTC Team 36397</div>
          <div className="foot-links">
            <Link href="/">Home</Link>
          </div>
        </div>
      </footer>
    </>
  );
}

import fs from "fs";
import path from "path";
import ScrollObserver from "./scroll-observer";
import { asset } from "./asset-prefix";

function readJson(filepath: string) {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), filepath), "utf-8"));
}

function readCollection(dir: string) {
  const fullDir = path.join(process.cwd(), dir);
  return fs
    .readdirSync(fullDir)
    .filter((f: string) => f.endsWith(".json"))
    .map((f: string) => JSON.parse(fs.readFileSync(path.join(fullDir, f), "utf-8")))
    .sort((a: { order?: number }, b: { order?: number }) => (a.order ?? 0) - (b.order ?? 0));
}

export default function Page() {
  const data = readJson("content/page/home.json");
  const team = readCollection("content/team");
  const timeline = readCollection("content/timeline");
  const outreach = readCollection("content/outreach");
  const resources = readCollection("content/resources");

  const { hero, about, values, robot, connect, contact, donate } = data;

  return (
    <>
      <ScrollObserver />
      <header>
        <div className="nav">
          <a href="#top" className="brand">
            <div className="brand-mark">
              <img src={asset("/logo.png")} alt="Variable Velocity logo" />
            </div>
            <div className="brand-name">
              VARIABLE <span>VELOCITY</span>
            </div>
          </a>
          <nav className="links">
            <a href="#top">Home</a>
            <a href="#about">Team</a>
            <a href="#robot">Our Robot</a>
            <a href="#journey">Competition History</a>
            <a href="#outreach">Outreach</a>
            <a href="#support">NPO/Donate</a>
            <a href="#contact">Contact Us</a>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero" style={{ paddingTop: 140 }}>
          <img className="hero-watermark" src={asset("/logo.png")} alt="" />
          <div className="wrap hero-grid">
            <div>
              <div className="chassis-tag fade-in">
                <span className="dot-live" /> FTC TEAM ID <b>{hero.teamId}</b> · {hero.season}
              </div>
              <div className="motto fade-in fade-in-delay-1">
                <span className="m1"><b>{hero.motto1}</b></span>
                <span className="sep">·</span>
                <span className="m2"><b>{hero.motto2}</b></span>
                <span className="sep">·</span>
                <span className="m3"><b>{hero.motto3}</b></span>
                <span className="sep">.</span>
              </div>
              <h1 className="fade-in fade-in-delay-2">
                {hero.title1}
                <span className="line2">
                  {hero.title2}<span className="accent">.</span>
                </span>
              </h1>
              <p className="hero-sub fade-in fade-in-delay-3">{hero.subtitle}</p>
              <div className="hero-actions fade-in fade-in-delay-3">
                <a href="#team" className="btn btn-primary">{hero.ctaPrimary}</a>
                <a href="#journey" className="btn btn-ghost">{hero.ctaSecondary}</a>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about">
          <div className="wrap about-grid">
            <div className="about-copy">
              <span className="eyebrow fade-in">{about.eyebrow}</span>
              <h2 className="fade-in fade-in-delay-1" style={{ marginTop: 10, fontSize: "clamp(1.9rem,3.5vw,2.6rem)" }}>
                {about.heading}
              </h2>
              <p className="fade-in fade-in-delay-2">{about.paragraph1}</p>
              <p className="fade-in fade-in-delay-3">{about.paragraph2}</p>
              <p className="fade-in fade-in-delay-4">{about.paragraph3}</p>
            </div>
            <div className="about-photo fade-right fade-in-delay-1">
              <img src={asset(about.teamPhoto)} alt="Variable Velocity team" />
            </div>
          </div>
        </section>

        {/* MISSION & VALUES */}
        <section id="mission">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow fade-in">{values.eyebrow}</span>
              <h2 className="fade-in fade-in-delay-1">{values.heading}</h2>
              <p className="fade-in fade-in-delay-2">{values.subheading}</p>
            </div>
            <div className="values-grid fade-scale">
              {values.items.map((v: { tag: string; title: string; description: string }, i: number) => (
                <div key={i} className={`value-card fade-in fade-in-delay-${i + 1}`}>
                  <span className="vnum">{v.tag}</span>
                  <h3>{v.title}</h3>
                  <p>{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OUR ROBOT */}
        <section id="robot">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow fade-in">{robot.eyebrow}</span>
              <h2 className="fade-in fade-in-delay-1">{robot.heading}</h2>
              <p className="fade-in fade-in-delay-2">{robot.subheading}</p>
            </div>
            <div className="fade-in fade-in-delay-2" style={{ marginBottom: 48, textAlign: "center" as const }}>
              <img
                src={asset(robot.image)}
                alt="Variable Velocity robot"
                style={{
                  maxWidth: 600,
                  width: "100%",
                  margin: "0 auto",
                  border: "1px solid var(--line-strong)",
                  boxShadow: "0 8px 32px rgba(255,10,36,.15)",
                }}
              />
            </div>
            <div className="values-grid fade-scale">
              {robot.features.map((f: { tag: string; title: string; description: string }, i: number) => (
                <div key={i} className={`value-card fade-in fade-in-delay-${i + 1}`}>
                  <span className="vnum">{f.tag}</span>
                  <h3>{f.title}</h3>
                  <p>{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* JOURNEY */}
        <section id="journey">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow fade-in">Our Journey</span>
              <h2 className="fade-in fade-in-delay-1">The season so far.</h2>
              <p className="fade-in fade-in-delay-2">
                A running log of milestones as Variable Velocity builds toward the DECODE season.
              </p>
            </div>
            <div className="timeline">
              {timeline.map((t: { year: string; title: string; description: string }, i: number) => (
                <div key={i} className={`tl-item fade-left fade-in-delay-${Math.min(i, 7)}`}>
                  <div className="tl-year">{t.year}</div>
                  <h3>{t.title}</h3>
                  <p>{t.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section id="team">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow fade-in">Meet the Team</span>
              <h2 className="fade-in fade-in-delay-1">The people behind the build.</h2>
              <p className="fade-in fade-in-delay-2">Eleven members. One mission. Every role matters.</p>
            </div>
            <div className="team-grid">
              {team.map((m: { name: string; role: string; photo: string }, i: number) => (
                <div key={i} className={`team-card fade-in fade-in-delay-${Math.min(i + 1, 7)}`}>
                  <div className="team-photo">
                    <img src={asset(m.photo)} alt={m.name} />
                  </div>
                  <div className="team-info">
                    <h3>{m.name}</h3>
                    <div className="role">{m.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OUTREACH */}
        <section id="outreach">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow fade-in">Community Outreach</span>
              <h2 className="fade-in fade-in-delay-1">Bringing more people onto the field.</h2>
              <p className="fade-in fade-in-delay-2">
                We believe STEM should be accessible to everyone. From summer workshops that recruit
                the next generation of builders to inclusive teaching sessions for special needs
                students, Variable Velocity is committed to opening doors — not just winning matches.
              </p>
            </div>

            {outreach.map((program: {
              title: string;
              eyebrow: string;
              description1: string;
              description2: string;
              bullets: string[];
              photos: { src: string; alt: string }[];
              photosFirst: boolean;
            }, i: number) => (
              <div key={i} className={`outreach-program fade-in fade-in-delay-${i + 1}`}>
                <div className="outreach-program-body">
                  {program.photosFirst && (
                    <div className="outreach-photos">
                      {program.photos.map((p, j) => (
                        <div key={j} className="photo-slot">
                          <img src={asset(p.src)} alt={p.alt} />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="outreach-program-text">
                    <span className="eyebrow">{program.eyebrow}</span>
                    <h3>{program.title}</h3>
                    <p>{program.description1}</p>
                    <p>{program.description2}</p>
                    <ul>
                      {program.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  </div>
                  {!program.photosFirst && (
                    <div className="outreach-photos">
                      {program.photos.map((p, j) => (
                        <div key={j} className="photo-slot">
                          <img src={asset(p.src)} alt={p.alt} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW WE CONNECT */}
        <section id="connect">
          <div className="wrap">
            <div className="section-head" style={{ textAlign: "center" as const, maxWidth: "none" }}>
              <h2 className="fade-in">{connect.heading}</h2>
            </div>
            <div className="connect-grid">
              {connect.items.map((item: { title: string; description: string; photo: string }, i: number) => (
                <div key={i} className={`connect-card fade-in fade-in-delay-${i + 1}`}>
                  <div className="connect-text">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div className="connect-photo">
                    <img src={asset(item.photo)} alt={item.title} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RESOURCES */}
        <section id="resources">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow fade-in">Resources</span>
              <h2 className="fade-in fade-in-delay-1">For teams, by teams.</h2>
            </div>
            <div className="resource-list">
              {resources.map((r: { title: string; description: string; url: string }, i: number) => (
                <div key={i} className={`resource-item fade-in fade-in-delay-${Math.min(i + 1, 7)}`}>
                  <div>
                    <div className="rtitle">{r.title}</div>
                    <div className="rdesc">{r.description}</div>
                  </div>
                  <a className="rlink" href={r.url} target="_blank" rel="noopener noreferrer">
                    Visit ↗
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NPO / DONATE */}
        <section id="support">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow fade-in">NPO / Donate</span>
              <h2 className="fade-in fade-in-delay-1">Support our mission.</h2>
            </div>
            <div className="donate-wrap fade-in fade-in-delay-2">
              <div className="donate-info">
                <div className="org-name">{donate.orgName}</div>
                <div className="org-meta">
                  <span className="org-detail">EIN: <span className="ein">{donate.ein}</span></span>
                  <span className="org-detail">{donate.orgType}</span>
                </div>
                <div className="donate-section">
                  <div className="label-head">Mission</div>
                  <p>{donate.mission}</p>
                </div>
                <div className="donate-section">
                  <div className="label-head">Vision</div>
                  <p>{donate.vision}</p>
                </div>
                <div className="donate-section">
                  <div className="label-head">Other Ways to Support</div>
                  <ul>
                    <li><b>Corporate Partnerships</b> — Long-term collaboration and support</li>
                    <li><b>In-kind Donations</b> — Donate equipment and services</li>
                    <li><b>Volunteering &amp; Mentoring</b> — Share your expertise and inspire young minds</li>
                  </ul>
                </div>
                <div className="donate-actions">
                  <a href="#contact" className="donate-btn">Get in Touch</a>
                  <span className="tax-note">All contributions are 100% tax-deductible</span>
                </div>
              </div>
              <div className="donate-qr">
                <div className="zelle-card">
                  <div className="zelle-header">
                    <div className="zelle-logo">Zelle<span>®</span></div>
                    <div className="zelle-subtitle">Scan to donate</div>
                  </div>
                  <div className="zelle-qr-frame">
                    <img src={asset(donate.qrCode)} alt={`Zelle QR Code for ${donate.zelleName}`} />
                  </div>
                  <div className="zelle-name">{donate.zelleName}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <div className="wrap contact-grid">
            <div>
              <span className="eyebrow fade-in">Get in Touch</span>
              <h2
                className="fade-in fade-in-delay-1"
                style={{ marginTop: 10, fontSize: "clamp(1.9rem,3.5vw,2.6rem)" }}
              >
                Reach out to Team 36397.
              </h2>
              <form style={{ marginTop: 32 }} action={contact.formAction} method="POST">
                <input type="hidden" name="_subject" value="New message from Variable Velocity website" />
                <div className="row2">
                  <div className="field fade-in fade-in-delay-2">
                    <label htmlFor="fn">First Name</label>
                    <input id="fn" name="first-name" type="text" required />
                  </div>
                  <div className="field fade-in fade-in-delay-3">
                    <label htmlFor="ln">Last Name</label>
                    <input id="ln" name="last-name" type="text" required />
                  </div>
                </div>
                <div className="field fade-in fade-in-delay-3">
                  <label htmlFor="em">Email</label>
                  <input id="em" name="_replyto" type="email" required />
                </div>
                <div className="field fade-in fade-in-delay-4">
                  <label htmlFor="sub">Subject</label>
                  <input id="sub" name="subject" type="text" />
                </div>
                <div className="field fade-in fade-in-delay-5">
                  <label htmlFor="msg">Message</label>
                  <textarea id="msg" name="message" rows={4} />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary fade-in fade-in-delay-6"
                  style={{ border: "none", cursor: "pointer" }}
                >
                  Send Message →
                </button>
              </form>
            </div>
            <div className="contact-info">
              <div className="item fade-right fade-in-delay-1">
                <div className="lbl">Email</div>
                <div className="val">{contact.email}</div>
              </div>
              <div className="item fade-right fade-in-delay-2">
                <div className="lbl">Location</div>
                <div className="val">{contact.location}</div>
              </div>
              <div className="item fade-right fade-in-delay-3">
                <div className="lbl">Follow</div>
                <div className="val">
                  <a
                    href={contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--red)", transition: "color .2s" }}
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap foot-row">
          <div className="foot-note">© 2026 Variable Velocity — FTC Team 36397 · Dream. Build. Ascend.</div>
          <div className="foot-links">
            <a href="#top">Home</a>
          </div>
        </div>
      </footer>
    </>
  );
}

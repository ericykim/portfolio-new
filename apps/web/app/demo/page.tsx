import Link from "next/link";

export default function FontDemo() {
  return (
    <div className="p-8 md:p-12">
      <div className="space-y-20">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl md:text-8xl font-[900] tracking-tight">
            Font Comparison
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            PP Telegraf vs PP Woodland
          </p>
        </div>

        {/* Side by Side Comparison */}
        <section className="space-y-12">
          <h3 className="text-4xl text-center">Side by Side Comparison</h3>

          {/* UltraLight - 200 */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2 p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl">
              <p className="text-sm font-bold text-slate-500">
                PP Telegraf - UltraLight 200
              </p>
              <h3 className="text-4xl md:text-5xl font-[200] font-body">
                The quick brown fox jumps over the lazy dog
              </h3>
            </div>
            <div className="space-y-2 p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl">
              <p className="text-sm font-bold text-slate-500">
                PP Woodland - UltraLight 200
              </p>
              <h3 className="text-4xl md:text-5xl font-[200] font-heading">
                The quick brown fox jumps over the lazy dog
              </h3>
            </div>
          </div>

          {/* Regular - 400 */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2 p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl">
              <p className="text-sm font-bold text-slate-500">
                PP Telegraf - Regular 400
              </p>
              <h3 className="text-4xl md:text-5xl font-normal font-body">
                The quick brown fox jumps over the lazy dog
              </h3>
            </div>
            <div className="space-y-2 p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl">
              <p className="text-sm font-bold text-slate-500">
                PP Woodland - Regular 400
              </p>
              <h3 className="text-4xl md:text-5xl font-normal font-heading">
                The quick brown fox jumps over the lazy dog
              </h3>
            </div>
          </div>

          {/* Bold - 700 */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2 p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl">
              <p className="text-sm font-bold text-slate-500">
                PP Telegraf - Bold 700
              </p>
              <h3 className="text-4xl md:text-5xl font-bold font-body">
                The quick brown fox jumps over the lazy dog
              </h3>
            </div>
            <div className="space-y-2 p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl">
              <p className="text-sm font-bold text-slate-500">
                PP Woodland - Bold 700
              </p>
              <h3 className="text-4xl md:text-5xl font-bold font-heading">
                The quick brown fox jumps over the lazy dog
              </h3>
            </div>
          </div>

          {/* Black/Heavy - 900 */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2 p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl">
              <p className="text-sm font-bold text-slate-500">
                PP Telegraf - Black 900
              </p>
              <h3 className="text-4xl md:text-5xl font-[900] font-body">
                The quick brown fox jumps over the lazy dog
              </h3>
            </div>
            <div className="space-y-2 p-6 bg-white/50 dark:bg-slate-800/50 rounded-xl">
              <p className="text-sm font-bold text-slate-500">
                PP Woodland - Heavy 900
              </p>
              <h3 className="text-4xl md:text-5xl font-[900] font-heading">
                The quick brown fox jumps over the lazy dog
              </h3>
            </div>
          </div>
        </section>

        {/* Combined Usage: Woodland Titles + Telegraf Body */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-5xl font-bold">
              Woodland Titles + Telegraf Body
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Combining organic headlines with geometric body text
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-12 shadow-xl space-y-12">
            {/* Hero Section Example */}
            <article className="space-y-6 border-b border-slate-200 dark:border-slate-700 pb-12">
              <h1 className="text-5xl md:text-7xl leading-tight">
                Design is not just what it looks like and feels like
              </h1>
              <p className="text-xl leading-relaxed text-slate-700 dark:text-slate-300">
                Design is how it works. The best products don&apos;t focus on
                features, they focus on clarity. When something is designed
                well, it becomes invisible. We stop thinking about the design
                and focus on what we&apos;re trying to accomplish.
              </p>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                Typography plays a crucial role in this clarity. By pairing
                Woodland&apos;s organic, handcrafted character for headlines
                with Telegraf&apos;s clean, geometric forms for body text, we
                create a hierarchy that feels both natural and modern.
              </p>
            </article>

            {/* Blog Post Example */}
            <article className="space-y-6 border-b border-slate-200 dark:border-slate-700 pb-12">
              <h2 className="text-4xl md:text-5xl">The Art of Typography</h2>
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                Typography is the craft of endowing human language with a
                durable visual form. It&apos;s about creating a seamless reading
                experience where the letters fade into the background, allowing
                the message to shine through.
              </p>

              <h3 className="text-2xl md:text-3xl pt-4">
                Why Font Pairing Matters
              </h3>
              <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                The right font pairing creates visual interest while maintaining
                readability. Woodland brings personality and warmth to headings,
                while Telegraf provides the clarity and sophistication needed
                for extended reading. Together, they create a balanced
                typographic system that works across different contexts.
              </p>

              <div className="grid md:grid-cols-3 gap-6 pt-4">
                <div className="space-y-2">
                  <h4 className="text-xl">Hierarchy</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Clear distinction between headings and body text guides the
                    reader&apos;s eye.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl">Contrast</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Organic vs geometric creates visual interest without chaos.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl">Balance</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Personality in headlines, clarity in body text.
                  </p>
                </div>
              </div>
            </article>

            {/* Card Layout Example */}
            <div>
              <h2 className="text-3xl mb-6">Featured Projects</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl space-y-3">
                  <h3 className="text-2xl">Project Alpha</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    A comprehensive redesign focusing on user experience and
                    modern aesthetics. This project demonstrates the power of
                    thoughtful typography and visual hierarchy.
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl space-y-3">
                  <h3 className="text-2xl">Project Beta</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    An exploration in minimalism and clarity. By stripping away
                    the unnecessary, we reveal what truly matters in digital
                    communication.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Numbers Comparison */}
        <section className="space-y-8">
          <h2 className="text-4xl text-center">Numbers &amp; Metrics</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 space-y-4">
              <p className="text-sm text-slate-500">PP Telegraf</p>
              <div className="space-y-2">
                <p className="text-5xl font-[900] font-body">0123456789</p>
                <p className="text-3xl font-normal font-body">$1,234.56</p>
                <p className="text-2xl font-body">€99.99 • £49.00 • ¥1000</p>
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 space-y-4">
              <p className="text-sm text-slate-500">PP Woodland</p>
              <div className="space-y-2">
                <p className="text-5xl font-[900] font-heading">0123456789</p>
                <p className="text-3xl font-normal font-heading">$1,234.56</p>
                <p className="text-2xl font-heading">€99.99 • £49.00 • ¥1000</p>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Guide */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-12 shadow-xl space-y-6">
          <h2 className="text-4xl">Easy to Use</h2>
          <div className="space-y-4">
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <p className="text-sm text-slate-500 mb-2">
                Headings automatically use Woodland:
              </p>
              <code className="text-sm font-mono">
                &lt;h1&gt;, &lt;h2&gt;, &lt;h3&gt;, &lt;h4&gt;, &lt;h5&gt;,
                &lt;h6&gt;
              </code>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <p className="text-sm text-slate-500 mb-2">
                Body text automatically uses Telegraf:
              </p>
              <code className="text-sm font-mono">
                &lt;p&gt;, &lt;span&gt;, &lt;div&gt;
              </code>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
              <p className="text-sm text-slate-500 mb-2">
                Or use utility classes:
              </p>
              <code className="text-sm font-mono block">
                className=&quot;font-heading&quot; // Woodland
              </code>
              <code className="text-sm font-mono block">
                className=&quot;font-body&quot; // Telegraf
              </code>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-center gap-4 pt-8">
          <Link
            href="/"
            className="px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-bold hover:scale-105 transition-transform"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

// Single source of truth for the blog. The sidebar, the post index, and
// prev/next links are all built from this list.
//
// To add a post: create blog/<slug>.html (copy an existing post), then add an
// entry here. Leave `date` empty for drafts; they are listed last.

window.BLOG_CATEGORIES = {
  awards: "Awards & recognition",
  research: "Research explainers",
  notes: "Notes"
};

window.BLOG_POSTS = [
  {
    slug: "emnlp-2026-outstanding-reviewer",
    title: "Outstanding Reviewer at EMNLP 2026",
    date: "2026-10-17",
    category: "awards",
    tags: ["emnlp", "reviewing", "service"],
    summary: "Recognized as an Outstanding Reviewer for the 2026 Conference on Empirical Methods in Natural Language Processing."
  },
  {
    slug: "afrispeech-multibench",
    title: "[Explainer] AfriSpeech-MultiBench: why African-accented ASR needs domain-specific evaluation",
    date: "",
    category: "research",
    tags: ["asr", "benchmarks"],
    summary: "What breaks when you evaluate speech recognition on clinical, legal, and everyday African-accented English, and what we learned from benchmarking 19 models."
  }
];

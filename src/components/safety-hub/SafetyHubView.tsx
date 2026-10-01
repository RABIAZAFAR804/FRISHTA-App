import React, { useState, useMemo } from 'react';
import { BlogPost, BlogCategory } from '../../types/blog';
import { BLOG_POSTS, CATEGORIES } from '../../data/blogData';
import { soundEffects } from '../../utils/audio';

interface SafetyHubViewProps {
  onSelectArticle: (articleId: string) => void;
  onOpen1122Call?: () => void;
}

export const SafetyHubView: React.FC<SafetyHubViewProps> = ({
  onSelectArticle,
  onOpen1122Call,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: BLOG_POSTS.length };
    BLOG_POSTS.forEach((post) => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.subtitle.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q)) ||
        post.author.name.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  // Featured post (first one or marked featured)
  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
  }, []);

  // Helper for category badge styling
  const getCategoryTheme = (category: BlogPost['category']) => {
    switch (category) {
      case 'Road Safety':
        return {
          bg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
          dot: 'bg-amber-400',
          icon: 'traffic',
        };
      case 'First-Aid Tips':
        return {
          bg: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
          dot: 'bg-rose-400',
          icon: 'medical_services',
        };
      case 'App Updates':
        return {
          bg: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
          dot: 'bg-cyan-400',
          icon: 'sensors',
        };
      case 'Life-Saving Stories':
        return {
          bg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
          dot: 'bg-emerald-400',
          icon: 'verified',
        };
      default:
        return {
          bg: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
          dot: 'bg-slate-400',
          icon: 'article',
        };
    }
  };

  const handleArticleClick = (id: string) => {
    soundEffects.playHapticClick();
    onSelectArticle(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full pb-32 pt-2 px-4 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Hero Mission Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#181c28] via-[#121520] to-[#0a0d14] border border-[#2a2e3d] p-6 md:p-8 shadow-2xl">
        {/* Glow ambient background effects */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#00f1fd]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-[#ff334b]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f1fd]/15 border border-[#00f1fd]/30 text-[#00f1fd] text-xs font-bold tracking-wide uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f1fd] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f1fd]" />
              </span>
              <span>FARISHTA SAFETY HUB &amp; CAD KNOWLEDGE BASE</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Life-Saving Insights &amp; Roadside First-Aid
            </h1>

            <p className="text-sm md:text-base text-[#dfe2f1]/80 leading-relaxed">
              Curated by trauma surgeons, emergency medical technicians, and telemetry engineers.
              Learn how to prevent crashes, stabilize victims in the golden hour, and leverage
              Rescue 1122 automated dispatch.
            </p>
          </div>

          {/* Quick 1122 Call Card */}
          <div className="shrink-0 flex flex-col items-center justify-center p-4 rounded-2xl bg-[#1c202e]/80 border border-[#313547] backdrop-blur-md text-center space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#ff5166]">
              <span className="material-symbols-outlined text-[18px] animate-pulse">
                e911_emergency
              </span>
              <span>URGENT EMERGENCY?</span>
            </div>
            <a
              href="tel:1122"
              onClick={onOpen1122Call}
              className="w-full px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff334b] to-[#be0035] text-white text-sm font-black flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,51,75,0.4)] hover:shadow-[0_0_30px_rgba(255,51,75,0.6)] active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">call</span>
              <span>CALL 1122 NOW</span>
            </a>
            <span className="text-[10px] text-[#dfe2f1]/50 font-mono-num">
              Toll-free Punjab • Sindh • KP • ICT
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-6 pt-5 border-t border-[#262a39] flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#dfe2f1]/50 text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides: 'helmet', 'first-aid', '1122 response', 'cervical spine'..."
              className="w-full pl-11 pr-10 py-3 rounded-xl bg-[#0e111a] border border-[#2a2f40] text-sm text-white placeholder-[#dfe2f1]/40 focus:outline-none focus:border-[#00f1fd] focus:ring-1 focus:ring-[#00f1fd] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#dfe2f1]/50 hover:text-white p-1 text-xs"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="text-xs text-[#00f1fd] shrink-0 font-medium self-end sm:self-center">
              Found {filteredPosts.length} article{filteredPosts.length === 1 ? '' : 's'}
            </div>
          )}
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          const count = categoryCounts[cat] || 0;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => {
                soundEffects.playHapticClick();
                setSelectedCategory(cat);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                isSelected
                  ? 'bg-gradient-to-r from-[#00f1fd] to-[#00bdc7] text-[#0a0d14] shadow-[0_0_16px_rgba(0,241,253,0.35)] scale-102'
                  : 'bg-[#151824] text-[#dfe2f1]/70 hover:text-white hover:bg-[#1c202e] border border-[#262a39]'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono-num font-bold ${
                  isSelected
                    ? 'bg-[#0a0d14]/30 text-[#0a0d14]'
                    : 'bg-[#262a39] text-[#dfe2f1]/60'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Spotlight / Featured Card (shown when no search and on 'All' or 'App Updates') */}
      {!searchQuery && selectedCategory === 'All' && featuredPost && (
        <div
          onClick={() => handleArticleClick(featuredPost.id)}
          className="group relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#171b28] to-[#121522] border border-[#2f3547] hover:border-[#00f1fd]/50 transition-all duration-300 shadow-xl cursor-pointer"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            {/* Image Column */}
            <div className="md:col-span-6 relative h-64 md:h-full min-h-[260px] overflow-hidden">
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121522] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#121522]" />

              {/* Spotlight Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#00f1fd] text-[#0a0d14] text-xs font-black tracking-wide uppercase shadow-lg flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">stars</span>
                  <span>FEATURED EDITORIAL</span>
                </span>
              </div>
            </div>

            {/* Content Column */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${
                      getCategoryTheme(featuredPost.category).bg
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        getCategoryTheme(featuredPost.category).dot
                      }`}
                    />
                    <span>{featuredPost.category}</span>
                  </span>
                  <span className="text-xs text-[#dfe2f1]/50 font-mono-num flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    {featuredPost.readTime}
                  </span>
                </div>

                <h2 className="font-display text-xl sm:text-2xl font-black text-white group-hover:text-[#00f1fd] transition-colors leading-tight">
                  {featuredPost.title}
                </h2>

                <p className="text-sm text-[#dfe2f1]/70 line-clamp-3 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
              </div>

              {/* Author & CTA Button */}
              <div className="pt-4 border-t border-[#262a39] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={featuredPost.author.avatarUrl}
                    alt={featuredPost.author.name}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-[#00f1fd]/40"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">
                      {featuredPost.author.name}
                    </p>
                    <p className="text-[10px] text-[#dfe2f1]/50 truncate">
                      {featuredPost.publishedDate}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-[#00f1fd]/15 hover:bg-[#00f1fd] text-[#00f1fd] hover:text-[#0a0d14] text-xs font-bold flex items-center gap-1.5 transition-all group-hover:shadow-[0_0_15px_rgba(0,241,253,0.3)] shrink-0"
                >
                  <span>Read Article</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Responsive Grid Layout */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00f1fd] text-[20px]">
              grid_view
            </span>
            <span>
              {selectedCategory === 'All' ? 'All Safety Guides & Articles' : `${selectedCategory}`}
            </span>
          </h2>
          <span className="text-xs text-[#dfe2f1]/50 font-mono-num">
            {filteredPosts.length} article{filteredPosts.length === 1 ? '' : 's'} available
          </span>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#141724] border border-[#262a39] text-center space-y-3">
            <span className="material-symbols-outlined text-4xl text-[#dfe2f1]/30">
              manage_search
            </span>
            <p className="text-sm font-semibold text-white">No articles match your search</p>
            <p className="text-xs text-[#dfe2f1]/60">
              Try searching with different terms like "cervical", "helmet", "1122", or "braking".
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-[#1c202e] hover:bg-[#262a39] text-xs font-bold text-[#00f1fd] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPosts.map((post) => {
              const theme = getCategoryTheme(post.category);
              return (
                <article
                  key={post.id}
                  onClick={() => handleArticleClick(post.id)}
                  className="group flex flex-col justify-between rounded-2xl bg-gradient-to-b from-[#161a27] to-[#10131d] border border-[#262a38] hover:border-[#00f1fd]/50 transition-all duration-200 overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer"
                >
                  {/* Top Cover Image */}
                  <div className="relative h-44 w-full overflow-hidden bg-[#0d0f17]">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#10131d] via-transparent to-black/30" />

                    {/* Category Tag Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md ${theme.bg}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />
                        <span>{post.category}</span>
                      </span>
                    </div>

                    {/* Reading time */}
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-[#0a0d14]/75 backdrop-blur-md text-[11px] font-mono-num text-[#dfe2f1]/80 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">schedule</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-display text-base font-bold text-white group-hover:text-[#00f1fd] transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-xs text-[#dfe2f1]/70 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Author + Read Button Footer */}
                    <div className="pt-3 border-t border-[#222635] flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={post.author.avatarUrl}
                          alt={post.author.name}
                          className="w-7 h-7 rounded-full object-cover ring-1 ring-[#313547]"
                        />
                        <div className="min-w-0">
                          <p className="text-[11px] font-bold text-white truncate">
                            {post.author.name}
                          </p>
                          <p className="text-[10px] text-[#dfe2f1]/50 truncate">
                            {post.publishedDate}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="px-3 py-1.5 rounded-lg bg-[#1a1e2b] group-hover:bg-[#00f1fd] text-[#00f1fd] group-hover:text-[#0a0d14] text-[11px] font-bold flex items-center gap-1 transition-all shrink-0"
                      >
                        <span>Read</span>
                        <span className="material-symbols-outlined text-[14px]">
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Safety Protocol Quick Reference Footer */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#172322] via-[#131d1f] to-[#121722] border border-[#2b4c47]/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#4edea3]/20 text-[#4edea3] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px]">verified_user</span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              Emergency Knowledge Saves More Lives Than Speed
            </h4>
            <p className="text-xs text-[#dfe2f1]/70">
              Share these first-aid and road safety guides with your family and fellow bike riders in Pakistan.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            soundEffects.playHapticClick();
            if (navigator.share) {
              navigator.share({
                title: 'Farishta App - Bike Accident Guardian & 1122 Safety Hub',
                url: window.location.href,
              }).catch(() => {});
            } else {
              navigator.clipboard?.writeText(window.location.href);
            }
          }}
          className="px-4 py-2 rounded-xl bg-[#1d2d2a] hover:bg-[#253d38] border border-[#4edea3]/30 text-[#4edea3] text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
        >
          <span className="material-symbols-outlined text-[16px]">share</span>
          <span>Share Safety Hub</span>
        </button>
      </div>
    </div>
  );
};

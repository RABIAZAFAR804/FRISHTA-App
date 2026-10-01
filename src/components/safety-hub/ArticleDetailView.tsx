import React, { useState } from 'react';
import { BlogPost, CalloutBox } from '../../types/blog';
import { BLOG_POSTS } from '../../data/blogData';
import { soundEffects } from '../../utils/audio';

interface ArticleDetailViewProps {
  articleId: string;
  onBack: () => void;
  onSelectRelatedArticle: (id: string) => void;
  onTriggerSOS?: () => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  articleId,
  onBack,
  onSelectRelatedArticle,
  onTriggerSOS,
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  const article = BLOG_POSTS.find((p) => p.id === articleId) || BLOG_POSTS[0];

  const relatedArticles = BLOG_POSTS.filter((p) => p.id !== article.id).slice(0, 2);

  const toggleChecklist = (key: string) => {
    soundEffects.playHapticClick();
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleShare = () => {
    soundEffects.playHapticClick();
    if (navigator.share) {
      navigator
        .share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const renderCallout = (callout: CalloutBox) => {
    switch (callout.type) {
      case 'urgent':
        return (
          <div className="my-6 p-5 rounded-2xl bg-gradient-to-r from-[#2a1318] to-[#1c0f13] border-2 border-[#ff334b]/60 shadow-[0_0_25px_rgba(255,51,75,0.25)] space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ff334b] text-[22px] animate-pulse">
                crisis_alert
              </span>
              <span className="text-xs font-black tracking-wider uppercase text-[#ff334b] px-2 py-0.5 rounded-full bg-[#ff334b]/20">
                {callout.badgeText || 'URGENT SAFETY PROTOCOL'}
              </span>
            </div>
            <h4 className="text-base font-bold text-white tracking-tight">{callout.title}</h4>
            <p className="text-sm text-[#ffd5dc] leading-relaxed whitespace-pre-line">
              {callout.content}
            </p>
          </div>
        );
      case 'warning':
        return (
          <div className="my-6 p-5 rounded-2xl bg-gradient-to-r from-[#281d11] to-[#1a140d] border border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2)] space-y-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-400 text-[22px]">warning</span>
              <span className="text-xs font-black tracking-wider uppercase text-amber-300 px-2 py-0.5 rounded-full bg-amber-500/20">
                {callout.badgeText || 'WARNING'}
              </span>
            </div>
            <h4 className="text-base font-bold text-white tracking-tight">{callout.title}</h4>
            <p className="text-sm text-amber-100/90 leading-relaxed whitespace-pre-line">
              {callout.content}
            </p>
          </div>
        );
      case 'protocol':
        return (
          <div className="my-6 p-5 rounded-2xl bg-gradient-to-r from-[#0d222b] to-[#0a1820] border border-[#00f1fd]/50 shadow-[0_0_20px_rgba(0,241,253,0.2)] space-y-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00f1fd] text-[22px]">
                cell_tower
              </span>
              <span className="text-xs font-black tracking-wider uppercase text-[#00f1fd] px-2 py-0.5 rounded-full bg-[#00f1fd]/20">
                {callout.badgeText || '1122 CAD PROTOCOL'}
              </span>
            </div>
            <h4 className="text-base font-bold text-white tracking-tight">{callout.title}</h4>
            <p className="text-sm text-[#d4f8fc] leading-relaxed whitespace-pre-line">
              {callout.content}
            </p>
          </div>
        );
      default:
        return (
          <div className="my-6 p-5 rounded-2xl bg-gradient-to-r from-[#11241d] to-[#0b1713] border border-[#4edea3]/50 shadow-[0_0_20px_rgba(78,222,163,0.2)] space-y-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#4edea3] text-[22px]">
                verified
              </span>
              <span className="text-xs font-black tracking-wider uppercase text-[#4edea3] px-2 py-0.5 rounded-full bg-[#4edea3]/20">
                {callout.badgeText || 'LIFE-SAVING TIP'}
              </span>
            </div>
            <h4 className="text-base font-bold text-white tracking-tight">{callout.title}</h4>
            <p className="text-sm text-[#d2f9e9] leading-relaxed whitespace-pre-line">
              {callout.content}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="w-full pb-36 pt-2 px-4 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Sticky Navigation & Quick Actions Bar */}
      <div className="sticky top-18 z-30 py-2.5 px-3 rounded-2xl bg-[#0d101a]/90 backdrop-blur-xl border border-[#242938] flex items-center justify-between shadow-xl">
        <button
          type="button"
          onClick={() => {
            soundEffects.playHapticClick();
            onBack();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#171b28] hover:bg-[#202538] text-white text-xs font-bold transition-all border border-[#2d3448] active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Safety Hub</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Font Size Toggle */}
          <button
            type="button"
            onClick={() => setFontSize((f) => (f === 'normal' ? 'large' : 'normal'))}
            className="px-2.5 py-1.5 rounded-xl bg-[#171b28] hover:bg-[#202538] text-[#dfe2f1]/80 hover:text-white text-xs font-mono-num font-bold border border-[#2d3448] transition-colors"
            title="Toggle Font Size"
          >
            {fontSize === 'normal' ? 'A+' : 'A-'}
          </button>

          {/* Share Button */}
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00f1fd]/15 hover:bg-[#00f1fd] text-[#00f1fd] hover:text-[#0a0d14] text-xs font-bold border border-[#00f1fd]/30 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">
              {copiedLink ? 'done' : 'share'}
            </span>
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Main Article Container */}
      <article className="rounded-3xl bg-[#111420] border border-[#262a3a] overflow-hidden shadow-2xl">
        {/* Cover Hero Banner */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-[#0a0d15]">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111420] via-[#111420]/60 to-black/40" />

          {/* Top Overlays: Category & Read Time */}
          <div className="absolute top-5 left-5 right-5 flex items-center justify-between flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-[#00f1fd]/20 border border-[#00f1fd]/40 text-[#00f1fd] text-xs font-bold uppercase backdrop-blur-md flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f1fd]" />
              <span>{article.category}</span>
            </span>

            <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[#dfe2f1] text-xs font-mono-num backdrop-blur-md flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              <span>{article.readTime}</span>
            </span>
          </div>

          {/* Bottom Title on Image */}
          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight drop-shadow-md">
              {article.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#dfe2f1]/80 max-w-2xl font-medium">
              {article.subtitle}
            </p>
          </div>
        </div>

        {/* Article Meta Bar (Author + Reviewer) */}
        <div className="p-6 border-b border-[#212535] bg-[#141826] flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Author */}
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatarUrl}
              alt={article.author.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-[#00f1fd]/40"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{article.author.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00f1fd]/15 text-[#00f1fd] font-bold">
                  AUTHOR
                </span>
              </div>
              <p className="text-xs text-[#dfe2f1]/60">{article.author.role}</p>
              {article.author.credentials && (
                <p className="text-[11px] text-[#dfe2f1]/40 italic">
                  {article.author.credentials}
                </p>
              )}
            </div>
          </div>

          {/* Medical Reviewer Certification */}
          {article.reviewedBy && (
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#1b2030] border border-[#2f3547]">
              <div className="w-9 h-9 rounded-xl bg-[#4edea3]/20 text-[#4edea3] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">verified</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#4edea3] uppercase tracking-wider block">
                  MEDICALLY VERIFIED
                </span>
                <p className="text-xs font-bold text-white">{article.reviewedBy.name}</p>
                <p className="text-[10px] text-[#dfe2f1]/60">
                  {article.reviewedBy.organization}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Article Body Content */}
        <div className="p-6 md:p-10 space-y-8">
          {/* Key Takeaways Box */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="p-5 sm:p-6 rounded-2xl bg-[#171d2b] border border-[#2b334a] shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-[#00f1fd]">
                <span className="material-symbols-outlined text-[22px]">lightbulb</span>
                <h3 className="font-display text-sm font-black uppercase tracking-wider">
                  Key Life-Saving Takeaways
                </h3>
              </div>
              <ul className="space-y-2.5">
                {article.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#dfe2f1]/90">
                    <span className="material-symbols-outlined text-[#4edea3] text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span className="leading-relaxed">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Sections Flow */}
          <div
            className={`space-y-8 ${
              fontSize === 'large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
            }`}
          >
            {article.sections.map((section, sIdx) => (
              <section key={sIdx} className="space-y-4 pt-2">
                <div className="space-y-1">
                  <h2 className="font-display text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    <span className="w-1.5 h-6 rounded-full bg-[#00f1fd]" />
                    <span>{section.heading}</span>
                  </h2>
                  {section.subheading && (
                    <p className="text-xs sm:text-sm text-[#dfe2f1]/60 italic font-medium pl-3.5">
                      {section.subheading}
                    </p>
                  )}
                </div>

                {/* Paragraphs */}
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-[#dfe2f1]/85 leading-relaxed">
                    {p}
                  </p>
                ))}

                {/* Bullet Points */}
                {section.bulletPoints && (
                  <ul className="space-y-2.5 my-3 pl-2 sm:pl-4">
                    {section.bulletPoints.map((bp, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[#dfe2f1]/80">
                        <span className="w-2 h-2 rounded-full bg-[#00f1fd] shrink-0 mt-2" />
                        <span className="leading-relaxed">{bp}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Checklist items (interactive) */}
                {section.checklistItems && (
                  <div className="my-4 p-4 sm:p-5 rounded-2xl bg-[#141826] border border-[#272d40] space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-[#00f1fd] uppercase tracking-wide">
                      <span className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px]">checklist</span>
                        <span>Interactive Rapid Action Checklist</span>
                      </span>
                      <span className="text-[10px] text-[#dfe2f1]/50 font-normal">
                        Tap to check off
                      </span>
                    </div>

                    <div className="space-y-2">
                      {section.checklistItems.map((item, cIdx) => {
                        const key = `${article.id}-${sIdx}-${cIdx}`;
                        const isDone = !!checkedItems[key];
                        return (
                          <div
                            key={cIdx}
                            onClick={() => toggleChecklist(key)}
                            className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                              isDone
                                ? 'bg-[#182a25] border-[#4edea3]/40 text-[#d2f9e9]'
                                : 'bg-[#1a1f30] border-[#2c3348] text-[#dfe2f1]/80 hover:bg-[#20263c]'
                            }`}
                          >
                            <span
                              className={`material-symbols-outlined text-[20px] ${
                                isDone ? 'text-[#4edea3]' : 'text-[#dfe2f1]/40'
                              }`}
                            >
                              {isDone ? 'check_box' : 'check_box_outline_blank'}
                            </span>
                            <span
                              className={`text-xs sm:text-sm font-medium ${
                                isDone ? 'line-through text-[#4edea3]/80' : ''
                              }`}
                            >
                              {item}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Callout box */}
                {section.callout && renderCallout(section.callout)}

                {/* Quote */}
                {section.quote && (
                  <blockquote className="my-6 p-5 rounded-2xl bg-[#151928] border-l-4 border-[#00f1fd] space-y-2">
                    <p className="text-sm sm:text-base italic text-white leading-relaxed">
                      "{section.quote.text}"
                    </p>
                    <footer className="text-xs font-bold text-[#00f1fd]">
                      — {section.quote.author}
                    </footer>
                  </blockquote>
                )}
              </section>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-[#222738] flex items-center flex-wrap gap-2">
            <span className="text-xs font-bold text-[#dfe2f1]/60">Tags:</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-[#181d2c] border border-[#2b3248] text-xs text-[#00f1fd] font-mono-num font-semibold"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Emergency 1122 In-Article Direct Action Callout */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#2c1318] via-[#1f1014] to-[#161928] border-2 border-[#ff334b]/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#ff334b] uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px] animate-pulse">
                  e911_emergency
                </span>
                <span>EMERGENCY DISPATCH TRIGGER</span>
              </div>
              <h4 className="text-base sm:text-lg font-black text-white">
                Are you currently at a live motorcycle accident scene?
              </h4>
              <p className="text-xs text-[#dfe2f1]/70 max-w-lg">
                Farishta automatically coordinates CAD dispatch with Punjab &amp; Sindh Emergency
                Service 1122. Do not hesitate—every second counts.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="tel:1122"
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#ff334b] to-[#c40032] text-white text-sm font-black flex items-center gap-2 shadow-[0_0_20px_rgba(255,51,75,0.4)] hover:shadow-[0_0_30px_rgba(255,51,75,0.6)] active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
                <span>Dial 1122</span>
              </a>

              {onTriggerSOS && (
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playEmergencyBeep();
                    onTriggerSOS();
                  }}
                  className="px-4 py-3 rounded-2xl bg-[#1c2132] hover:bg-[#252c42] border border-[#ff334b]/40 text-white text-xs font-bold transition-all"
                >
                  Trigger Farishta CAD
                </button>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles Section */}
      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-[#00f1fd] text-[22px]">menu_book</span>
          <span>More Life-Saving Guides from Farishta</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relatedArticles.map((rel) => (
            <div
              key={rel.id}
              onClick={() => {
                soundEffects.playHapticClick();
                onSelectRelatedArticle(rel.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group p-4 rounded-2xl bg-[#141826] border border-[#272d40] hover:border-[#00f1fd]/50 transition-all cursor-pointer flex gap-4 items-center shadow-lg"
            >
              <img
                src={rel.coverImage}
                alt={rel.title}
                className="w-20 h-20 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="min-w-0 space-y-1">
                <span className="text-[10px] font-bold text-[#00f1fd] uppercase">
                  {rel.category} • {rel.readTime}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#00f1fd] transition-colors line-clamp-2 leading-snug">
                  {rel.title}
                </h4>
                <p className="text-[11px] text-[#dfe2f1]/50 truncate">{rel.author.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

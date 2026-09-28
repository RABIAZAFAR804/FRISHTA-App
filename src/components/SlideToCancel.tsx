import React, { useState, useRef, useEffect, useCallback } from 'react';
import { soundEffects } from '../utils/audio';

interface SlideToCancelProps {
  onCancel: () => void;
  isCancelled: boolean;
}

export const SlideToCancel: React.FC<SlideToCancelProps> = ({ onCancel, isCancelled }) => {
  const [dragProgress, setDragProgress] = useState(0); // 0 to 1
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleEnd = useCallback(() => {
    if (isCancelled) return;
    setIsDragging(false);
    if (dragProgress >= 0.82) {
      setDragProgress(1);
      soundEffects.playHapticClick();
      onCancel();
    } else {
      setDragProgress(0);
    }
  }, [dragProgress, isCancelled, onCancel]);

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleEnd();
      }
    };
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging || !trackRef.current || isCancelled) return;
      const rect = trackRef.current.getBoundingClientRect();
      const currentX = e.clientX - rect.left - 28; // Center handle offset
      const maxDist = rect.width - 64; // handle width ~56px
      const progress = Math.min(Math.max(currentX / maxDist, 0), 1);
      setDragProgress(progress);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, isCancelled, handleEnd]);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!trackRef.current || isCancelled) return;
    const touch = e.touches[0];
    const rect = trackRef.current.getBoundingClientRect();
    const currentX = touch.clientX - rect.left - 28;
    const maxDist = rect.width - 64;
    const progress = Math.min(Math.max(currentX / maxDist, 0), 1);
    setDragProgress(progress);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  return (
    <div className="w-full select-none">
      <div
        ref={trackRef}
        className={`relative h-16 w-full rounded-2xl p-1.5 flex items-center overflow-hidden transition-colors border ${
          isCancelled
            ? 'bg-[#172e25] border-[#4edea3]/40'
            : dragProgress > 0.5
            ? 'bg-[#21352e] border-[#4edea3]/50'
            : 'bg-[#171b26] border-[#313540]'
        }`}
      >
        {/* Fill Track Background */}
        <div
          className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#00a572]/20 to-[#4edea3]/30 transition-all duration-75 pointer-events-none"
          style={{ width: `${Math.max(dragProgress * 100, 10)}%` }}
        />

        {/* Pulsing Arrow Shimmer in track */}
        {!isCancelled && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span
              className="text-xs uppercase font-extrabold tracking-widest text-[#dfe2f1]/60 flex items-center gap-1.5 transition-opacity duration-200"
              style={{ opacity: 1 - dragProgress * 1.5 }}
            >
              <span>Slide to Cancel False Alarm</span>
              <span className="material-symbols-outlined text-[18px] text-[#4edea3] animate-pulse">
                keyboard_double_arrow_right
              </span>
            </span>
          </div>
        )}

        {isCancelled && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-[#4edea3] font-bold text-sm tracking-wide gap-2">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            <span>ALARM ABORTED • USER CONFIRMED SAFE</span>
          </div>
        )}

        {/* Heavy-Duty Tactile Thumb Slider Knob */}
        <div
          onMouseDown={() => {
            if (!isCancelled) setIsDragging(true);
          }}
          onTouchStart={() => {
            if (!isCancelled) setIsDragging(true);
          }}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`relative z-10 w-14 h-13 rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing transition-transform touch-none shadow-xl ${
            isCancelled
              ? 'bg-[#4edea3] text-[#003824] pointer-events-none'
              : 'bg-gradient-to-br from-[#00a572] to-[#4edea3] text-[#002113] active:scale-95 shadow-[0_0_20px_rgba(78,222,163,0.5)]'
          }`}
          style={{
            transform: `translateX(${
              trackRef.current
                ? dragProgress * (trackRef.current.clientWidth - 68)
                : 0
            }px)`,
            transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {isCancelled ? (
            <span className="material-symbols-outlined text-[24px]">check</span>
          ) : (
            <span className="material-symbols-outlined text-[26px]">
              {dragProgress > 0.5 ? 'thumb_up' : 'chevron_right'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

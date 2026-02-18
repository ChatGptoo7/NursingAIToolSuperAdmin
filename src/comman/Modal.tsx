import * as React from "react";

export type ModalSize = "sm" | "md" | "lg" | "xl";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subTitle?: string;
  children?: React.ReactNode;
  size?: ModalSize;
  showCloseIcon?: boolean;
  clickAwayClose?: boolean;
  className?: string;
  isFromVisionBoard?: boolean
}

const sizeToMaxWidth: Record<ModalSize, string> = {
  sm: "max-w-[sm]",
  md: "max-w-[400px]",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

const panelBase = [
  'bg-stone-400',
  'border border-[#F9F9F9]',
  'rounded-2xl',
  'shadow-2xl',
  'text-dark-700',
].join(' ');

const headerBase = [
  "flex items-start gap-3",
  "px-6 pt-5 pb-4",
  "border-b border-[#f9f9f9]",
].join(" ");

const bodyBase = "px-0 py-0 h-full";

export default function Modal({
  open,
  onClose,
  title,
  subTitle,
  children,
  size = "md",
  showCloseIcon = true,
  clickAwayClose = true,
  className,
  isFromVisionBoard
}: ModalProps) {
  const backdropRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      document.addEventListener("keydown", onKey);
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  const handleBackdropMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!clickAwayClose) return;
    if (e.target === backdropRef.current) onClose();
  };

  return (
    <div
      className='fixed inset-0 z-[1000]'
      aria-modal
      role='dialog'
      aria-labelledby={title ? 'tw-modal-title' : undefined}
    >
      <div
        ref={backdropRef}
        onMouseDown={handleBackdropMouseDown}
        className='fixed inset-0 bg-[rgba(0,0,0,0.85)]'
      />
      <div className='fixed inset-0 overflow-y-auto'>
        <div className={`flex min-h-full items-center justify-center px-0 md:px-4 ${isFromVisionBoard ? '' : "pt-4"} md:pt-4 pb-0 md:pb-4`} >
          <div
            className={[
              panelBase,
              `w-full ${sizeToMaxWidth[size]}`,
              'relative z-[1001]',
              'transition-all duration-150 ease-out',
              'opacity-100 scale-100',
              'my-8',
              className ?? '',
            ].join(' ')}
          >
            {(title || showCloseIcon) && (
              <div className={headerBase}>
                <div className='flex-1 min-w-0'>
                  {title && (
                    <h3
                      id='tw-modal-title'
                      className='text-dark-700 text-xl font-semibold leading-6 tracking-tight'
                    >
                      {title}
                    </h3>
                  )}
                  {subTitle && (
                    <p className='mt-1 text-sm text-dark-700'>{subTitle}</p>
                  )}
                </div>
                {showCloseIcon && (
                  <button
                    type='button'
                    aria-label='Close'
                    onClick={onClose}
                    className='-m-2 p-2 rounded-lg text-dark-700 hover:text-dark-900 hover:bg-white/5 transition'
                  >
                    <svg
                      width='21'
                      height='21'
                      viewBox='0 0 21 21'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M15.5 5.5L5.5 15.5M5.5 5.5L15.5 15.5'
                        stroke='currentColor'
                        strokeWidth='1.25'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div className={bodyBase}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

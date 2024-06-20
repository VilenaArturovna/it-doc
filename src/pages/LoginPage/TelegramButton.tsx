import React, { useEffect, useRef } from 'react';

interface AuthFormProps {
  onSubmit: (user: any) => void;
}

export function TelegramButton({ onSubmit }: AuthFormProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.TelegramAuth = {
      onAuth: onSubmit,
    };

    const isTabletL = true;

    const tgDataSize = isTabletL ? 'large' : 'small';

    const script = document.createElement('script');

    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', `ITdocBot`);
    script.setAttribute('data-size', tgDataSize);
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-onauth', 'TelegramAuth.onAuth(user)');
    script.async = true;

    rootRef.current?.appendChild(script);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      rootRef.current?.removeChild(script);
    };
  });

  return <div ref={rootRef}></div>;
}

'use client';

import Header from 'components/Header/Header';

export default function IndexPage() {
  return (
    <main className="flex flex-col gap-2">
      <Header
        title="Olá, Administrador!"
        subtitle="Painel de Controle"
        profile
      />
    </main>
  );
}

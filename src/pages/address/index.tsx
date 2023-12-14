import Header from '@/components/Header/Header';
import RootLayout from '@/components/RootLayout/Layout';

const IndexPage = () => (
  <RootLayout>
    <main className="flex flex-col gap-2 h-full">
      <Header
        title="Contratos"
        subtitle="Gerenciamento de contratos, comunidades e ruas"
      />
    </main>
  </RootLayout>
);

export default IndexPage;

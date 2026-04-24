import MinimalHeader from './MinimalHeader';
import MinimalFooter from './MinimalFooter';

export default function LaExperienciaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MinimalHeader />
      {children}
      <MinimalFooter />
    </>
  );
}

import EmployerProfile from "./_components/EmployerProfile";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;

  return (
    <>
      <EmployerProfile slug={slug} />
    </>
  );
};

export default Page;

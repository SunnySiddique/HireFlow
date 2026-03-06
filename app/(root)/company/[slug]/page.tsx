import CompanyView from "../_components/CompanyView";

interface CompanyProfileViewPageProps {
  params: Promise<{ slug: string }>;
}
const CompanyProfileViewPage = async ({
  params,
}: CompanyProfileViewPageProps) => {
  const { slug } = await params;

  return (
    <>
      <CompanyView slug={slug} />
    </>
  );
};

export default CompanyProfileViewPage;

import { Helmet, HelmetProvider } from "react-helmet-async";

const Page = ({ breadcrumbs, children, className, pageTitle, ...rest }) => {
  return (
    <HelmetProvider>
      <div className={className} {...rest}>
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>

        {breadcrumbs}
        <div>{children}</div>
      </div>
    </HelmetProvider>
  );
};

Page.displayName = "Page";

export default Page;

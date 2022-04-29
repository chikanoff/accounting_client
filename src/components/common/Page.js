import { Helmet } from 'react-helmet';

const Page = ({ breadcrumbs, children, className, pageTitle, ...rest }) => {
  return (
    <div className={className} {...rest}>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      {breadcrumbs}
      <div>{children}</div>
    </div>
  );
};

Page.displayName = 'Page';

export default Page;

import PageContent from "../components/PageContent";
import { useRouteError } from "react-router-dom";
import AsideNavigation from "../components/AsideNavigation";

function ErrorPage() {
  const error = useRouteError();
  let title = "An error occured!";
  let message = "Something went wrong";

  if (error.status === 500) {
    message = error.data.message;
    console.log(message);
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not found resource or page. ";
  }
  return (
    <>
      <AsideNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;

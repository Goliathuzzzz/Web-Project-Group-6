import ProfilePic from "./ProfilePic";
import SavedStations from "./SavedStations";
import Specifications from "./Specifications";

function MyPage() {
  return (
    <>
      <div className="flex flex-col my-page:flex-row justify-center my-page:gap-5 mb-2">
        <ProfilePic />
        <SavedStations />
      </div>
      <Specifications />
    </>
  );
}

export default MyPage;

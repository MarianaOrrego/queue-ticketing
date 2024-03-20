import { objectManager } from "../classes";
import TicketInformation from "../components/TicketInformation";

const ScreenPage = () => {
  let reverseDisplayArray = [];

  const localStorageData = localStorage.getItem("displayData");

  if (localStorageData && localStorageData?.length > 0) {
    const displayArray = JSON.parse(localStorageData);
    reverseDisplayArray = displayArray.reverse();
  } else {
    const displayManager = objectManager.displayManager;
    const displayArray = Object.values(displayManager.queue);
    reverseDisplayArray = displayArray.reverse();

    localStorage.setItem("displayData", JSON.stringify(reverseDisplayArray));
  }

  return (
    <div>
      <TicketInformation reverseDisplayArray={reverseDisplayArray} />
    </div>
  );
};

export default ScreenPage;

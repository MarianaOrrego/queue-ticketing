import { objectManager } from "../classes";
import TicketInformation from "../components/TicketInformation";

const ScreenPage = () => {
  const displayManager = objectManager.displayManager;
  const displayArray = Object.values(displayManager.queue);
  const reverseDisplayArray = displayArray.reverse();

  return (
    <div>
      <TicketInformation reverseDisplayArray={reverseDisplayArray} />
    </div>
  );
};

export default ScreenPage;

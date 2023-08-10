import { Table, ProgressBar } from "react-bootstrap";
const CapacitySquare = ({ currentStudentsByClass, roomCapacities }) => {
  const { infantsCap, crawlersCap, toddlersCap, twosCap, totalCap } =
    roomCapacities;

  const { infants, crawlers, toddlers, twos, total } = currentStudentsByClass;

  function returnStatusBar(current, cap) {
    let now = Math.floor((current / cap) * 100);
    return <ProgressBar variant="info" now={now} label={`${now}%`} />;
  }

  return (
      <div>
        {returnStatusBar(infants, infantsCap)}
        {returnStatusBar(crawlers, crawlersCap)}
        {returnStatusBar(toddlers, toddlersCap)}
        {returnStatusBar(twos, twosCap)}
        {returnStatusBar(total, totalCap)}
      </div>
  );
};

export default CapacitySquare;

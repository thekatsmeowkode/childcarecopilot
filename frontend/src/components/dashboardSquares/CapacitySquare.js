import { ProgressBar } from "react-bootstrap";
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
      <span>
        Infant Room {infants} enrolled / {infantsCap} possible
        {returnStatusBar(infants, infantsCap)}
      </span>
      <span>
        Crawler Room {crawlers} enrolled / {crawlersCap} possible
        {returnStatusBar(crawlers, crawlersCap)}
      </span>
      <span>
        Toddlers Room {toddlers} enrolled / {toddlersCap} possible
        {returnStatusBar(toddlers, toddlersCap)}
      </span>
      <span>
        Twos Room {twos} enrolled / {twosCap} possible
        {returnStatusBar(twos, twosCap)}
      </span>
      <span>
        Total Students {total} enrolled / {totalCap} possible
        {returnStatusBar(total, totalCap)}
      </span>
    </div>
  );
};

export default CapacitySquare;

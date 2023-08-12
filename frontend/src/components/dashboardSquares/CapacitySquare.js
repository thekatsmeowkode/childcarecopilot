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
        <div className="status-bar-title">Infants</div>
        <div className="status-bar-container">
          <div>{infants}</div>
          <div className="status-bar">
            {returnStatusBar(infants, infantsCap)}
          </div>
          <div>{infantsCap}</div>
        </div>
      </span>
      <span>
        <div className="status-bar-title">Crawlers</div>
        <div className="status-bar-container">
          <div>{crawlers}</div>
          <div className="status-bar">
            {returnStatusBar(crawlers, crawlersCap)}
          </div>
          <div>{crawlersCap}</div>
        </div>
      </span>
      <span>
        <div className="status-bar-title">Toddlers</div>
        <div className="status-bar-container">
          <div>{toddlers}</div>
          <div className="status-bar">
            {returnStatusBar(toddlers, toddlersCap)}
          </div>
          <div>{toddlersCap}</div>
        </div>
      </span>
      <span>
        <div className="status-bar-title">Twos</div>
        <div className="status-bar-container">
          <div>{twosCap}</div>
          <div className="status-bar">{returnStatusBar(twos, twosCap)}</div>
          <div>{twosCap}</div>
        </div>
      </span>
      <span>
        <div className="status-bar-title">Total Students</div>
        <div className="status-bar-container">
          <div>{total}</div>
          <div className="status-bar">{returnStatusBar(total, totalCap)}</div>
          <div>{totalCap}</div>
        </div>
      </span>
    </div>
  );
};

export default CapacitySquare;

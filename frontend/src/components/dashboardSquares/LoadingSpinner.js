import {Spinner} from 'react-bootstrap'

const LoadingSpinner = () => (
    <Spinner animation="grow" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );

export default LoadingSpinner